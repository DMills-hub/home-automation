import * as cdk from 'aws-cdk-lib'
import { Construct } from 'constructs'
import { HomeAutomationFargate } from '../constructs/home-automation/home-automation-fargate'
import { Config } from '../definitions'
import { EcsDomainLambda } from '../constructs/management/ecs-domain-lambda'

export class HomeAutomationStack extends cdk.Stack {
  public readonly ecsDomainLambda: EcsDomainLambda
  public readonly homeAutomationFargate: HomeAutomationFargate
  constructor(scope: Construct, id: string, props: Config) {
    super(scope, id, props)

    this.ecsDomainLambda = new EcsDomainLambda(this, 'EcsDomainLambda')

    this.homeAutomationFargate = new HomeAutomationFargate(
      this,
      'HomeAutomationFargate',
      {
        vpc: props.vpc
      }
    )
  }
}
