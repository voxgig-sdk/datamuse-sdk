
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { DatamuseSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await DatamuseSDK.test()
    equal(null !== testsdk, true)
  })

})
