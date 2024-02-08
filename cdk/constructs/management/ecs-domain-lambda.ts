import { Construct } from 'constructs'
import * as lambda from 'aws-cdk-lib/aws-lambda-nodejs'
import path = require('path')
import * as events from 'aws-cdk-lib/aws-events'
import * as eventsTargets from 'aws-cdk-lib/aws-events-targets'
import * as iam from 'aws-cdk-lib/aws-iam'

export class EcsDomainLambda extends Construct {
  public fn: lambda.NodejsFunction
  private role: iam.Role
  constructor(scope: Construct, id: string) {
    super(scope, id)

    const lambdaActionsPolicyDocument = new iam.PolicyDocument({
      statements: [
        new iam.PolicyStatement({
          actions: [
            'ec2:DescribeNetworkInterfaces',
            'ecs:DescribeClusters',
            'ecs:ListTagsForResource',
            'route53:ChangeResourceRecordSets'
          ],
          effect: iam.Effect.ALLOW,
          resources: ['*']
        })
      ]
    })

    const lambdaLogsPolicyDocument = new iam.PolicyDocument({
      statements: [
        new iam.PolicyStatement({
          actions: [
            'logs:CreateLogGroup',
            'logs:CreateLogStream',
            'logs:PutLogEvents'
          ],
          effect: iam.Effect.ALLOW,
          resources: ['*']
        })
      ]
    })

    this.role = new iam.Role(this, 'EcsDomainLambdaRole', {
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
      inlinePolicies: {
        EcsDomainLambdaPolicy: lambdaActionsPolicyDocument,
        EcsDomainLambdaLogsPolicy: lambdaLogsPolicyDocument
      }
    })

    this.fn = new lambda.NodejsFunction(this, 'EcsDomainLambda', {
      functionName: 'ecs-domain-lambda',
      entry: path.join(__dirname, '../../ecs-domain-lambda/index.ts'),
      handler: 'handler',
      role: this.role
    })

    const rule = new events.Rule(this, 'EcsDomainLambdaEventRule', {
      description: 'Publish ECS Event to Lambda',
      eventPattern: {
        source: ['aws.ecs'],
        detailType: ['ECS Task State Change'],
        detail: {
          desiredStatus: ['RUNNING'],
          lastStatus: ['RUNNING']
        }
      }
    })

    const lambdaFnTarget = new eventsTargets.LambdaFunction(this.fn)

    rule.addTarget(lambdaFnTarget)
  }
}
