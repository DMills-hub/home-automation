import { DockerImageAsset } from 'aws-cdk-lib/aws-ecr-assets'
import { Construct } from 'constructs'

interface Props {
  /**
   * Path to docker file
   */
  directory: string

  /**
   * Docker build tag
   */
  tag: string

  /**
   * Asset name
   */
  assetName: string
}

export class HomeAutomationEcsDockerImage extends Construct {
  public readonly dockerImageAsset: DockerImageAsset

  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id)

    this.dockerImageAsset = new DockerImageAsset(this, 'DockerImageAsset', {
      directory: props.directory,
      buildArgs: {
        tag: props.tag
      },
      assetName: props.assetName
    })
  }
}
