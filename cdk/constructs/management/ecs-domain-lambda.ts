import { Construct } from 'constructs'
import * as lambda from 'aws-cdk-lib/aws-lambda-nodejs'
import path = require('path')
import * as events from 'aws-cdk-lib/aws-events'
import * as eventsTargets from 'aws-cdk-lib/aws-events-targets'

export class EcsDomainLambda extends Construct {
  public fn: lambda.NodejsFunction
  constructor(scope: Construct, id: string) {
    super(scope, id)

    this.fn = new lambda.NodejsFunction(this, 'EcsDomainLambda', {
      functionName: 'ecs-domain-lambda',
      entry: path.join(__dirname, '../../ecs-domain-lambda/index.ts'),
      handler: 'handler'
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

    // this.fn.
  }
}
