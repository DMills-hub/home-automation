import * as cdk from 'aws-cdk-lib'

export interface Config extends cdk.StackProps {
  /**
   * VPC configuration
   */
  vpc: {
    /**
     * VPC name
     */
    vpcName: string
    /**
     * VPC cidr block (ip range to assign to vpc)
     */
    vpcCidr: string
  }
}
