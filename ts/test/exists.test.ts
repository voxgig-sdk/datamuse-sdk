
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { DatamuseSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = DatamuseSDK.test()
    equal(testsdk instanceof DatamuseSDK, true,
      'DatamuseSDK.test() must return a client synchronously')
  })

})
