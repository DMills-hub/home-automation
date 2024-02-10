import { Api, StackContext, StaticSite } from 'sst/constructs'

export function ExampleStack({ stack }: StackContext) {
  const api = new Api(stack, 'Api', {
    routes: {
      'POST /api/device/health': 'packages/functions/src/device/health.handler'
    }
  })

  // Deploy our React app
  const site = new StaticSite(stack, 'ReactSite', {
    path: 'packages/frontend',
    buildCommand: 'npm run build',
    buildOutput: 'build',
    environment: {
      REACT_APP_API_URL: api.url
    }
  })

  // Show the URLs in the output
  stack.addOutputs({
    SiteUrl: site.url,
    ApiEndpoint: api.url
  })
}
