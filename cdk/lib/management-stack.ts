import * as cdk from 'aws-cdk-lib'
import { Construct } from 'constructs'
import { Config } from '../definitions'
import { EcsDomainLambda } from '../constructs/management/ecs-domain-lambda'

export class ManagementStack extends cdk.Stack {
  public readonly ecsDomainLambda: EcsDomainLambda
  constructor(scope: Construct, id: string, props: cdk.StackProps) {
    super(scope, id, props)

    this.ecsDomainLambda = new EcsDomainLambda(this, 'EcsDomainLambda')
  }
}
