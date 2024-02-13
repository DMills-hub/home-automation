import { Handler } from 'aws-lambda'
import { Device, Event } from '../definitions'
import db, { convertAttributeMapToObject } from '../util/db'

const LIMIT = 1

export const handler: Handler<Event> = async (event) => {
  const table = process.env.TABLE_NAME as string

  const { Items, LastEvaluatedKey, Count } = await db
    .scan({ TableName: table, Limit: LIMIT })
    .promise()

  // do not do this in a real application, counting records can be extremely slow on dynamodb
  const { Count: totalcount } = await db
    .scan({ TableName: table, Select: 'COUNT' })
    .promise()

  const formattedItems =
    Items?.map((value) => convertAttributeMapToObject<Device>(value)) ?? []

  return {
    statusCode: 200,
    body: JSON.stringify({
      items: formattedItems,
      lastKey: LastEvaluatedKey
        ? convertAttributeMapToObject<{ id: string }>(LastEvaluatedKey).id
        : undefined,
      totalItems: Count ?? 0,
      total: totalcount ?? 0
    })
  }
}
