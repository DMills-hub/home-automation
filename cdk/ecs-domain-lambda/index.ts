/**
 * Credit goes to
 * https://github.com/foby/aws-ecs-public-dns/blob/develop/src/update-task-dns.js
 *
 * Just wanted a typescript version!
 */

import { ECS, EC2, Route53 } from 'aws-sdk'

const ec2 = new EC2()
const ecs = new ECS()
const route53 = new Route53()

interface Attribute {
  name: string
  value: string
}

interface Attachment {
  id: string
  type: string
  status: string
  details: Attribute[]
}

interface Detail {
  attachments: Attachment[]
  attributes: Attribute[]
  clusterArn: string
}

interface HandlerEvent {
  version: string
  id: string
  'detail-type': string
  source: string
  account: string
  time: string
  region: string
  resources: string[]
  detail: Detail
}

export const handler = async (
  event: HandlerEvent,
  _context: any,
  _callback: any
) => {
  console.log('Received event: %j', event)

  const detail = event.detail
  const clusterArn = detail.clusterArn

  console.log(`clusterArn: ${clusterArn}`)

  const tags = await getClusterTags(clusterArn, ['HostedZoneId', 'DomainName'])

  if (!tags.DomainName || !tags.HostedZoneId) {
    throw new Error(
      `Failed to uodate cluster: ${clusterArn}, missing tags HostedZoneId/DomainName`
    )
  }

  console.log(`DomainName: ${tags.DomainName}`)
  console.log(`HostedZoneId: ${tags.HostedZoneId}`)

  const networkInterfaceId = getNetworkInterfaceId(detail.attachments)

  console.log(`Network Interface Id: ${networkInterfaceId}`)

  const publicIp = await getPublicIp(networkInterfaceId)

  console.log(`Public IP: ${publicIp}`)

  const clusterName = clusterArn.split(':cluster/')[1]

  await updateDnsRecord(
    clusterName,
    tags.HostedZoneId,
    tags.DomainName,
    publicIp
  )
}

const updateDnsRecord = async (
  clusterName: string,
  hostedZoneId: string,
  domain: string,
  publicIp: string
) => {
  const updateResult = await route53
    .changeResourceRecordSets({
      HostedZoneId: hostedZoneId,
      ChangeBatch: {
        Comment: `Auto generated Record for ECS Fargate cluster ${clusterName}`,
        Changes: [
          {
            Action: 'UPSERT',
            ResourceRecordSet: {
              Name: domain,
              Type: 'A',
              TTL: 180,
              ResourceRecords: [
                {
                  Value: publicIp
                }
              ]
            }
          }
        ]
      }
    })
    .promise()

  console.log(`updateResult: ${updateResult}`)
}

const getPublicIp = async (networkInterfaceId: string) => {
  const data = await ec2
    .describeNetworkInterfaces({
      NetworkInterfaceIds: [networkInterfaceId]
    })
    .promise()

  if (
    !data.NetworkInterfaces ||
    !data.NetworkInterfaces[0].PrivateIpAddresses
  ) {
    throw new Error('No network interfaces found')
  }

  return data.NetworkInterfaces[0].PrivateIpAddresses[0].Association
    ?.PublicIp as string
}

const getNetworkInterfaceId = (attachments: Attachment[]) => {
  const eniAttachment = attachments.find(
    (attachment) => attachment.type === 'eni'
  )

  if (!eniAttachment) {
    throw new Error('No eni attachment found.')
  }

  const networkInterfaceAttribute = eniAttachment.details.find(
    (attr) => attr.name === 'networkInterfaceId'
  )

  if (!networkInterfaceAttribute) {
    throw new Error('No network interface attribute.')
  }

  return networkInterfaceAttribute.value
}

const getClusterTags = async <T extends string>(
  clusterArn: string,
  keysToGet: T[]
) => {
  const res = await ecs
    .listTagsForResource({
      resourceArn: clusterArn
    })
    .promise()

  let obj: { [key in T]?: string } = {}

  const tags = res.tags ?? []

  for (const tag of tags) {
    if (keysToGet.includes((tag.key ?? '') as T)) {
      obj = {
        ...obj,
        [tag.key as T]: tag.value as string
      }
    }
  }

  return obj
}
