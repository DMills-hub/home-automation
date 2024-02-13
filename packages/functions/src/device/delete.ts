import db from '../util/db'
import { Event } from '../definitions'
import { Handler } from 'aws-lambda'

export const handler: Handler<Event> = async (event) => {
  if (!event.body)
    return {
      statusCode: 422,
      body: JSON.stringify({
        message: 'No body passed to handler'
      })
    }
  const parsedBody = JSON.parse(event.body) as { id: string }
  const tableName = process.env.TABLE_NAME as string

  const res = await db
    .deleteItem({
      Key: {
        id: {
          S: parsedBody.id
        }
      },
      TableName: tableName
    })
    .promise()

  if (res.$response.error) {
    return {
      statusCode: 422,
      body: JSON.stringify({
        message: `Issues deleting item with id - ${parsedBody.id}`
      })
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Successfully deleted item with id - ${parsedBody.id}`
    })
  }
}
