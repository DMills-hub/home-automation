export interface Event {
  body?: string
  headers?: {
    [key: string]: any
  }
}

export interface PathParameters<T extends object> {
  pathParameters: T
}

export interface Device {
  id: string
  address: string
  hardware: string
  name: string
  type: string
}
