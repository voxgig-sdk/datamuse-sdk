
const envlocal = __dirname + '/../../../.env.local'
require('dotenv').config({ quiet: true, path: [envlocal] })

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'


import { DatamuseSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveDelay,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


describe('PetEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DATAMUSE_TEST_LIVE=TRUE.
  afterEach(liveDelay('DATAMUSE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DatamuseSDK.test()
    const ent = testsdk.Pet()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DATAMUSE_TEST_LIVE
    for (const op of ['create', 'list', 'load', 'remove']) {
      if (maybeSkipControl(t, 'entityOp', 'pet.' + op, live)) return
    }

    const setup = basicSetup()
    // The basic flow consumes synthetic IDs and field values from the
    // fixture (entity TestData.json). Those don't exist on the live API.
    // Skip live runs unless the user provided a real ENTID env override.
    if (setup.syntheticOnly) {
      t.skip('live entity test uses synthetic IDs from fixture — set DATAMUSE_TEST_PET_ENTID JSON to run live')
      return
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const pet_ref01_ent = client.Pet()
    let pet_ref01_data = setup.data.new.pet['pet_ref01']

    pet_ref01_data = await pet_ref01_ent.create(pet_ref01_data)
    assert(null != pet_ref01_data.id)


    // LIST
    const pet_ref01_match: any = {}

    const pet_ref01_list = await pet_ref01_ent.list(pet_ref01_match)

    assert(!isempty(select(pet_ref01_list, { id: pet_ref01_data.id })))


    // LOAD
    const pet_ref01_match_dt0: any = {}
    pet_ref01_match_dt0.id = pet_ref01_data.id
    const pet_ref01_data_dt0 = await pet_ref01_ent.load(pet_ref01_match_dt0)
    assert(pet_ref01_data_dt0.id === pet_ref01_data.id)


    // REMOVE
    const pet_ref01_match_rm0: any = { id: pet_ref01_data.id }
    await pet_ref01_ent.remove(pet_ref01_match_rm0)
  

    // LIST
    const pet_ref01_match_rt0: any = {}

    const pet_ref01_list_rt0 = await pet_ref01_ent.list(pet_ref01_match_rt0)

    assert(isempty(select(pet_ref01_list_rt0, { id: pet_ref01_data.id })))


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/pet/PetTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = DatamuseSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['pet01','pet02','pet03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  // Detect whether the user provided a real ENTID JSON via env var. The
  // basic flow consumes synthetic IDs from the fixture file; without an
  // override those synthetic IDs reach the live API and 4xx. Surface this
  // to the test so it can skip rather than fail.
  const idmapEnvVal = process.env['DATAMUSE_TEST_PET_ENTID']
  const idmapOverridden = null != idmapEnvVal && idmapEnvVal.trim().startsWith('{')

  const env = envOverride({
    'DATAMUSE_TEST_PET_ENTID': idmap,
    'DATAMUSE_TEST_LIVE': 'FALSE',
    'DATAMUSE_TEST_EXPLAIN': 'FALSE',
    'DATAMUSE_APIKEY': 'NONE',
  })

  idmap = env['DATAMUSE_TEST_PET_ENTID']

  const live = 'TRUE' === env.DATAMUSE_TEST_LIVE

  if (live) {
    client = new DatamuseSDK(merge([
      {
        apikey: env.DATAMUSE_APIKEY,
      },
      extra
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.DATAMUSE_TEST_EXPLAIN,
    live,
    syntheticOnly: live && !idmapOverridden,
    now: Date.now(),
  }

  return setup
}
  
