

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { DatamuseSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


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
      if (!live && maybeSkipControl(t, 'entityOp', 'pet.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"format":"int64","name":"id","req":true,"type":"`$INTEGER`","index$":0},{"active":true,"name":"name","req":true,"type":"`$STRING`","index$":1},{"active":true,"name":"tag","req":false,"type":"`$STRING`","index$":2}],"id":{"field":"id","name":"id"},"name":"pet","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"pet","orig":"pet","reqd":true,"type":"`$OBJECT`","index$":0}]},"contract":{"id":"POST /words","json":"{\"consumes\":[\"application/json\"],\"operationId\":\"addPet\",\"parameters\":[{\"description\":\"Pet to add to the store\",\"in\":\"body\",\"name\":\"pet\",\"required\":true,\"schema\":{\"properties\":{\"name\":{\"type\":\"string\"},\"tag\":{\"type\":\"string\"}},\"required\":[\"name\"],\"type\":\"object\"}}],\"produces\":[\"application/json\"],\"protocol\":\"http\",\"responses\":{\"200\":{\"description\":\"pet response\",\"schema\":{\"allOf\":[{\"properties\":{\"name\":{\"type\":\"string\"},\"tag\":{\"type\":\"string\"}},\"required\":[\"name\"],\"type\":\"object\"},{\"properties\":{\"id\":{\"format\":\"int64\",\"type\":\"integer\"}},\"required\":[\"id\"]}],\"type\":\"object\"}},\"default\":{\"description\":\"unexpected error\",\"schema\":{\"properties\":{\"code\":{\"format\":\"int32\",\"type\":\"integer\"},\"message\":{\"type\":\"string\"}},\"required\":[\"code\",\"message\"],\"type\":\"object\"}}},\"securitySource\":\"unspecified\"}","source":"swagger2","version":1},"kind":"http","method":"POST","orig":"/words","segments":[{"lit":"words"}],"select":{"exist":["pet"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"limit","orig":"limit","reqd":false,"type":"`$INTEGER`","index$":0},{"active":true,"kind":"query","name":"tag","orig":"tag","reqd":false,"type":"`$ANY`","index$":1}]},"contract":{"id":"GET /words","json":"{\"consumes\":[\"application/json\"],\"operationId\":\"findPets\",\"parameters\":[{\"collectionFormat\":\"csv\",\"description\":\"tags to filter by\",\"in\":\"query\",\"items\":{\"type\":\"string\"},\"name\":\"tags\",\"required\":false,\"type\":\"array\"},{\"description\":\"maximum number of results to return\",\"format\":\"int32\",\"in\":\"query\",\"name\":\"limit\",\"required\":false,\"type\":\"integer\"}],\"produces\":[\"application/json\"],\"protocol\":\"http\",\"responses\":{\"200\":{\"description\":\"pet response\",\"schema\":{\"items\":{\"allOf\":[{\"properties\":{\"name\":{\"type\":\"string\"},\"tag\":{\"type\":\"string\"}},\"required\":[\"name\"],\"type\":\"object\"},{\"properties\":{\"id\":{\"format\":\"int64\",\"type\":\"integer\"}},\"required\":[\"id\"]}],\"type\":\"object\"},\"type\":\"array\"}},\"default\":{\"description\":\"unexpected error\",\"schema\":{\"properties\":{\"code\":{\"format\":\"int32\",\"type\":\"integer\"},\"message\":{\"type\":\"string\"}},\"required\":[\"code\",\"message\"],\"type\":\"object\"}}},\"securitySource\":\"unspecified\"}","source":"swagger2","version":1},"kind":"http","method":"GET","orig":"/words","segments":[{"lit":"words"}],"select":{"exist":["limit","tag"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"id","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /pets/{id}","json":"{\"consumes\":[\"application/json\"],\"operationId\":\"find pet by id\",\"parameters\":[{\"description\":\"ID of pet to fetch\",\"format\":\"int64\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"type\":\"integer\"}],\"produces\":[\"application/json\"],\"protocol\":\"http\",\"responses\":{\"200\":{\"description\":\"pet response\",\"schema\":{\"allOf\":[{\"properties\":{\"name\":{\"type\":\"string\"},\"tag\":{\"type\":\"string\"}},\"required\":[\"name\"],\"type\":\"object\"},{\"properties\":{\"id\":{\"format\":\"int64\",\"type\":\"integer\"}},\"required\":[\"id\"]}],\"type\":\"object\"}},\"default\":{\"description\":\"unexpected error\",\"schema\":{\"properties\":{\"code\":{\"format\":\"int32\",\"type\":\"integer\"},\"message\":{\"type\":\"string\"}},\"required\":[\"code\",\"message\"],\"type\":\"object\"}}},\"securitySource\":\"unspecified\"}","source":"swagger2","version":1},"kind":"http","method":"GET","orig":"/pets/{id}","segments":[{"lit":"pets"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"id","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"DELETE /pets/{id}","json":"{\"consumes\":[\"application/json\"],\"operationId\":\"deletePet\",\"parameters\":[{\"description\":\"ID of pet to delete\",\"format\":\"int64\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"type\":\"integer\"}],\"produces\":[\"application/json\"],\"protocol\":\"http\",\"responses\":{\"204\":{\"description\":\"pet deleted\"},\"default\":{\"description\":\"unexpected error\",\"schema\":{\"properties\":{\"code\":{\"format\":\"int32\",\"type\":\"integer\"},\"message\":{\"type\":\"string\"}},\"required\":[\"code\",\"message\"],\"type\":\"object\"}}},\"securitySource\":\"unspecified\"}","source":"swagger2","version":1},"kind":"http","method":"DELETE","orig":"/pets/{id}","segments":[{"lit":"pets"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"}},"relations":{"ancestors":[]},"key$":"pet","name__orig":"pet","Name":"Pet","name_":"pet","name-":"pet","NAME":"PET","index$":0}, {"active":true,"entity":"pet","key$":"BasicPetFlow","kind":"basic","name":"BasicPetFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"pet_ref01"},"match":{},"op":"create","spec":[],"valid":[],"index$":0},{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"pet_ref01"}}],"index$":1},{"active":true,"data":{},"input":{"ref":"pet_ref01","srcdatavar":"pet_ref01_data","suffix":"_dt0"},"match":{"id":"pet01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-pet_ref01"}}],"index$":2},{"active":true,"data":{},"input":{"ref":"pet_ref01","suffix":"_rm0"},"match":{"id":"pet01"},"op":"remove","spec":[],"valid":[],"index$":3},{"active":true,"data":{},"input":{"suffix":"_rt0"},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemNotExists","def":{"ref":"pet_ref01"}}],"index$":4}]}, 'Pet')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const pet_ref01_ent = client.Pet()
    let pet_ref01_data = setup.data.new.pet['pet_ref01']

    pet_ref01_data = (await pet_ref01_ent.create(pet_ref01_data)).data()
    assert(null != pet_ref01_data.id)


    // LIST
    const pet_ref01_match: any = {}

    const pet_ref01_list = (await pet_ref01_ent.list(pet_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(pet_ref01_list, { id: pet_ref01_data.id })))


    // LOAD
    const pet_ref01_match_dt0: any = {}
    pet_ref01_match_dt0.id = pet_ref01_data.id
    const pet_ref01_data_dt0 = (await pet_ref01_ent.load(pet_ref01_match_dt0)).data()
    assert(pet_ref01_data_dt0.id === pet_ref01_data.id)


    // REMOVE
    const pet_ref01_match_rm0: any = { id: pet_ref01_data.id }
    await pet_ref01_ent.remove(pet_ref01_match_rm0)
  

    // LIST
    const pet_ref01_match_rt0: any = {}

    const pet_ref01_list_rt0 = (await pet_ref01_ent.list(pet_ref01_match_rt0)).map((e: any) => e.data())

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

  const env = envOverride({
    'DATAMUSE_TEST_PET_ENTID': idmap,
    'DATAMUSE_TEST_LIVE': 'FALSE',
    'DATAMUSE_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['DATAMUSE_TEST_PET_ENTID']

  const live = 'TRUE' === env.DATAMUSE_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DATAMUSE_TEST_PET_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new DatamuseSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
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
    transport,
    now: Date.now(),
  }

  return setup
}
  
