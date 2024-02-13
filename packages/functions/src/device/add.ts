import db, { convertObjectToAttributeMap } from '../util/db'
import { Device, Event } from '../definitions'
import { v4 } from 'uuid'
import { Handler } from 'aws-lambda'

export const handler: Handler<Event> = async (event) => {
  if (!event.body)
    return {
      statusCode: 422,
      body: JSON.stringify({
        message: 'No body passed to handler'
      })
    }
  const parsedBody = JSON.parse(event.body) as Omit<Device, 'id'>
  const tableName = process.env.TABLE_NAME as string

  const id = v4()

  const item = convertObjectToAttributeMap({
    id,
    address: parsedBody.address,
    hardware: parsedBody.hardware,
    name: parsedBody.name,
    type: parsedBody.type
  })

  const res = await db
    .putItem({
      TableName: tableName,
      Item: item
    })
    .promise()

  if (res.$response.error) {
    return {
      statusCode: 422,
      body: JSON.stringify({ message: 'Could not process device.' })
    }
  }

  const device = { ...parsedBody, id }

  return {
    statusCode: 200,
    body: JSON.stringify({ device, message: 'Successfully created device.' })
  }
}
