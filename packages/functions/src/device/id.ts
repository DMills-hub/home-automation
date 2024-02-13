import { Handler } from 'aws-lambda'
import { Device, Event, PathParameters } from '../definitions'
import db, { convertAttributeMapToObject } from '..//util/db'

type IdEvent = Event & PathParameters<{ id: string }>

export const handler: Handler<IdEvent> = async (event) => {
  const id = event.pathParameters.id

  const tableName = process.env.TABLE_NAME as string

  const { Item } = await db
    .getItem({
      Key: { id: { S: id } },
      TableName: tableName
    })
    .promise()

  if (!Item) {
    throw new Error(`Can't get item with id - ${id}`)
  }

  return convertAttributeMapToObject<Device>(Item)
}
