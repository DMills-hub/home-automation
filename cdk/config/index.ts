import { Config } from '../definitions'

const config: Config = {
  env: {
    account: '185485002954',
    region: 'eu-west-2'
  },
  vpc: {
    vpcName: 'home-automation-vpc',
    vpcCidr: '10.0.0.0/24'
  }
}

export default config
