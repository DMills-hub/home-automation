import { Construct } from 'constructs'
import * as ec2 from 'aws-cdk-lib/aws-ec2'
import * as ecs from 'aws-cdk-lib/aws-ecs'
import { HomeAutomationEcsDockerImage } from './home-automation-ecs-docker-image'
import path = require('path')
import { Config } from '../definitions'

interface Props extends Pick<Config, 'vpc'> {}

export class HomeAutomationFargate extends Construct {
  public readonly vpc: ec2.Vpc
  public readonly cluster: ecs.Cluster
  public readonly fargateService: ecs.FargateService
  public readonly taskDefinition: ecs.TaskDefinition
  public readonly appEcsDockerImage: HomeAutomationEcsDockerImage

  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id)

    this.vpc = new ec2.Vpc(this, 'HomeAutomationVpc', {
      vpcName: props.vpc.vpcName,
      ipAddresses: ec2.IpAddresses.cidr(props.vpc.vpcCidr)
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

    this.appEcsDockerImage = new HomeAutomationEcsDockerImage(
      this,
      'HomeAutomationEcsAppDockerImage',
      {
        directory: path.join(__dirname, '../../app'),
        tag: 'home-automation-app'
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

    this.taskDefinition.addContainer('HomeAutomationApp', {
      image: ecs.ContainerImage.fromDockerImageAsset(
        this.appEcsDockerImage.dockerImageAsset
      ),
      containerName: 'home-automation-app',
      portMappings: [
        {
          containerPort: 80,
          hostPort: 80,
          name: 'app-port'
        }
      ]
    })
  }
}
