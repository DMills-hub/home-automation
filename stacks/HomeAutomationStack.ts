import { Api, StackContext, StaticSite, Table } from 'sst/constructs'

export function ExampleStack({ stack }: StackContext) {
  const table = new Table(stack, 'Device', {
    fields: {
      id: 'string',
      name: 'string',
      type: 'string',
      address: 'string',
      hardware: 'string'
    },
    primaryIndex: {
      partitionKey: 'id'
    }
  })

  const api = new Api(stack, 'Api', {
    routes: {
      'POST /api/device/health': 'packages/functions/src/device/health.handler',
      'POST /api/device/add': 'packages/functions/src/device/add.handler',
      'POST /api/device/{id}': 'packages/functions/src/device/id.handler',
      'POST /api/device/all': 'packages/functions/src/device/all.handler'
    },
    defaults: {
      function: {
        environment: { TABLE_NAME: table.tableName },
        permissions: [table]
      }
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
