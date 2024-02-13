import { AttributeValue } from 'aws-lambda'
import { DynamoDB } from 'aws-sdk'

const db = new DynamoDB()

export default db

/**
 * Converts normal object into a DynamoDB
 * AttributeMap
 *
 * @param obj Object to convert
 * @returns DynamoDB AttributeMap
 */
export const convertObjectToAttributeMap = <T extends object>(
  obj: T
): { [key: string]: AttributeValue } => {
  const keys = Object.keys(obj)

  const newObj = keys.reduce((prevValue, key, i) => {
    const objValue = obj[key as keyof typeof obj]
    let attributeValue: AttributeValue = { S: objValue as string | undefined }

    if (typeof objValue === 'number') {
      attributeValue = {
        N: objValue as unknown as string | undefined
      }
    }

    return {
      ...prevValue,
      [key]: attributeValue
    }
  }, {}) as { [key: string]: AttributeValue }

  return newObj
}

/**
 * Converts a DyanmoDB attribute map to a normal
 * object
 *
 * @param attributes DynamoDB AttributeMap
 * @returns T object
 */
export const convertAttributeMapToObject = <T>(
  attributes: DynamoDB.AttributeMap
): T => {
  const keys = Object.keys(attributes)

  return keys.reduce((prevValue, key, i) => {
    const attribute = attributes[key]
    const attributeKey = Object.keys(attribute)[0]

    const attributeValue = attribute[attributeKey as keyof typeof attribute]

    return {
      ...prevValue,
      [key]: attributeValue
    }
  }, {}) as T
}
