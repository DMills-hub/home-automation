import { Construct } from 'constructs'
import * as ec2 from 'aws-cdk-lib/aws-ec2'
import * as ecs from 'aws-cdk-lib/aws-ecs'
import * as route53 from 'aws-cdk-lib/aws-route53'
import { HomeAutomationEcsDockerImage } from './home-automation-ecs-docker-image'
import path = require('path')
import { Config } from '../../definitions'
import { Tags } from 'aws-cdk-lib'

interface Props extends Pick<Config, 'vpc'> {}

export class HomeAutomationFargate extends Construct {
  public readonly vpc: ec2.Vpc
  public readonly cluster: ecs.Cluster
  public readonly fargateService: ecs.FargateService
  public readonly taskDefinition: ecs.TaskDefinition
  public readonly appEcsDockerImage: HomeAutomationEcsDockerImage
  public readonly backendEcsDockerImage: HomeAutomationEcsDockerImage
  public readonly nginxEcsDockerImage: HomeAutomationEcsDockerImage
  private readonly HOSTED_ZONE_ID = 'Z0997108SZN2DJJ6WTLQ'
  private readonly DOMAIN_NAME = 'home-automation-app.dmills-hub.com'

  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id)

    this.vpc = new ec2.Vpc(this, 'HomeAutomationVpc', {
      vpcName: props.vpc.vpcName,
      ipAddresses: ec2.IpAddresses.cidr(props.vpc.vpcCidr),
      // nat gateways are expensive and unneeded
      natGateways: 0
    })

    this.taskDefinition = new ecs.TaskDefinition(
      this,
      'HomeAutomationTaskDefiniton',
      {
        compatibility: ecs.Compatibility.FARGATE,
        memoryMiB: '512',
        cpu: '256'
      }
    )

    this.cluster = new ecs.Cluster(this, 'HomeAutomationEcsCluster', {
      vpc: this.vpc
    })

    Tags.of(this.cluster).add('HostedZoneId', this.HOSTED_ZONE_ID)
    Tags.of(this.cluster).add('DomainName', this.DOMAIN_NAME)

    this.appEcsDockerImage = new HomeAutomationEcsDockerImage(
      this,
      'HomeAutomationEcsAppDockerImage',
      {
        directory: path.join(__dirname, '../../../app'),
        tag: 'home-automation-app',
        assetName: 'home-automation-backend'
      }
    )

    this.backendEcsDockerImage = new HomeAutomationEcsDockerImage(
      this,
      'HomeAutomationEcsBackendDockerImage',
      {
        directory: path.join(__dirname, '../../../backend'),
        tag: 'home-automation-backend',
        assetName: 'home-automation-backend'
      }
    )

    this.nginxEcsDockerImage = new HomeAutomationEcsDockerImage(
      this,
      'HomeAutomationEcsNginxDockerImage',
      {
        directory: path.join(__dirname, '../../../nginx'),
        tag: 'home-automation-nginx',
        assetName: 'home-automation-nginx'
      }
    )

    const securityGroup = new ec2.SecurityGroup(
      this,
      'HomeAutomationFargateSecurityGroupd',
      {
        vpc: this.vpc,
        allowAllOutbound: true,
        description: 'Home Automation Fargate Security Group'
      }
    )

    // Any IPV4 address gets routed to port 80, which should be app container
    securityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(80))
    // Any IPV6 address gets routed to port 80, which should be app container
    securityGroup.addIngressRule(ec2.Peer.anyIpv6(), ec2.Port.tcp(80))

    this.fargateService = new ecs.FargateService(
      this,
      'HomeAutomationFargate',
      {
        cluster: this.cluster,
        taskDefinition: this.taskDefinition,
        assignPublicIp: true,
        securityGroups: [securityGroup]
      }
    )

    this.taskDefinition.addContainer('HomeAutomationNginx', {
      image: ecs.ContainerImage.fromDockerImageAsset(
        this.nginxEcsDockerImage.dockerImageAsset
      ),
      containerName: 'home-automation-nginx',
      logging: ecs.LogDriver.awsLogs({
        streamPrefix: 'home=automation-nginx'
      }),
      portMappings: [
        {
          containerPort: 80,
          hostPort: 80,
          name: 'nginx-port'
        }
      ]
    })

    this.taskDefinition.addContainer('HomeAutomationApp', {
      image: ecs.ContainerImage.fromDockerImageAsset(
        this.appEcsDockerImage.dockerImageAsset
      ),
      containerName: 'home-automation-app',
      logging: ecs.LogDriver.awsLogs({
        streamPrefix: 'home-automation-app'
      }),
      portMappings: [
        {
          containerPort: 3000,
          hostPort: 3000,
          name: 'app-port'
        }
      ]
    })

    this.taskDefinition.addContainer('HomeAutomationBackend', {
      image: ecs.ContainerImage.fromDockerImageAsset(
        this.backendEcsDockerImage.dockerImageAsset
      ),
      logging: ecs.LogDriver.awsLogs({
        streamPrefix: 'home-automation-backend'
      }),
      containerName: 'home-automation-backend',
      portMappings: [
        {
          containerPort: 5000,
          hostPort: 5000
        }
      ]
    })
  }
}
