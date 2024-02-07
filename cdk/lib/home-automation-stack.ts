import * as cdk from 'aws-cdk-lib'
import { Construct } from 'constructs'
import { HomeAutomationFargate } from '../constructs/home-automation/home-automation-fargate'
import { Config } from '../definitions'

export class HomeAutomationStack extends cdk.Stack {
  public readonly homeAutomationFargate: HomeAutomationFargate
  constructor(scope: Construct, id: string, props: Config) {
    super(scope, id, props)

    this.homeAutomationFargate = new HomeAutomationFargate(
      this,
      'HomeAutomationFargate',
      {
        vpc: props.vpc
      }
    )
  }
}
