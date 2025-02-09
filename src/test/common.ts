import { Registry } from 'prom-client'

import app from '../admin-app'
import { S3Backend } from '../storage/backend'
import { Queue } from '../queue'

export const adminApp = app({}, { register: new Registry() })

const ENV = process.env

export function useMockQueue() {
  const queueSpy: jest.SpyInstance | undefined = undefined
  beforeEach(() => {
    mockQueue()
  })

  return queueSpy
}

export function mockQueue() {
  const sendSpy = jest.fn()
  const queueSpy = jest.fn().mockReturnValue({
    send: sendSpy,
  })
  jest.spyOn(Queue, 'getInstance').mockImplementation(queueSpy as any)

  return { queueSpy, sendSpy }
}

export function useMockObject() {
  beforeEach(() => {
    process.env = { ...ENV }

    jest.spyOn(S3Backend.prototype, 'getObject').mockResolvedValue({
      metadata: {
        httpStatusCode: 200,
        size: 3746,
        mimetype: 'image/png',
        lastModified: new Date('Thu, 12 Aug 2021 16:00:00 GMT'),
        eTag: 'abc',
        cacheControl: 'no-cache',
        contentLength: 3746,
      },
      body: Buffer.from(''),
    })

    jest.spyOn(S3Backend.prototype, 'uploadObject').mockResolvedValue({
      httpStatusCode: 200,
      size: 3746,
      mimetype: 'image/png',
      lastModified: new Date('Thu, 12 Aug 2021 16:00:00 GMT'),
      eTag: 'abc',
      cacheControl: 'no-cache',
      contentLength: 3746,
    })

    jest.spyOn(S3Backend.prototype, 'copyObject').mockResolvedValue({
      httpStatusCode: 200,
    })

    jest.spyOn(S3Backend.prototype, 'deleteObject').mockResolvedValue()

    jest.spyOn(S3Backend.prototype, 'deleteObjects').mockResolvedValue()

    jest.spyOn(S3Backend.prototype, 'headObject').mockResolvedValue({
      httpStatusCode: 200,
      size: 3746,
      mimetype: 'image/png',
      eTag: 'abc',
      cacheControl: 'no-cache',
      lastModified: new Date('Wed, 12 Oct 2022 11:17:02 GMT'),
      contentLength: 3746,
    })

    jest.spyOn(S3Backend.prototype, 'privateAssetUrl').mockResolvedValue('local:///data/sadcat.jpg')
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })
}
