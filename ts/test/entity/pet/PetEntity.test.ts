

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"id":{"a":true,"fo":"int64","h":"Id","n":"id","r":true,"t":"`$INTEGER`","key$":"id","index$":0},"name":{"a":true,"h":"Name","n":"name","r":true,"t":"`$STRING`","key$":"name","index$":1},"tag":{"a":true,"h":"Tag","n":"tag","r":false,"t":"`$STRING`","key$":"tag","index$":2}},"id":{"field":"id","name":"id"},"name":"pet","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /words","source":"swagger2","version":2},"g":{"query":[{"a":true,"k":"query","n":"pet","or":"pet","r":true,"t":"`$OBJECT`","index$":0}]},"k":"http","m":"POST","o":"/words","q":{"exist":["pet"]},"r":{},"s":[{"lit":"words"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /words","source":"swagger2","version":2},"g":{"query":[{"a":true,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"k":"query","n":"tag","or":"tag","r":false,"t":"`$ANY`","index$":1}]},"k":"http","m":"GET","o":"/words","q":{"exist":["limit","tag"]},"r":{},"s":[{"lit":"words"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /pets/{id}","source":"swagger2","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/pets/{id}","q":{"exist":["id"]},"r":{},"s":[{"lit":"pets"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /pets/{id}","source":"swagger2","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"DELETE","o":"/pets/{id}","q":{"exist":["id"]},"r":{},"s":[{"lit":"pets"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"}},"relations":{"ancestors":[]},"key$":"pet","name__orig":"pet","Name":"Pet","name_":"pet","name-":"pet","NAME":"PET","index$":0}, {"active":true,"entity":"pet","key$":"BasicPetFlow","kind":"basic","name":"BasicPetFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"pet_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"pet_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"pet_ref01","srcdatavar":"pet_ref01_data","suffix":"_dt0"},"m":{"id":"pet01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-pet_ref01"}}],"index$":2},{"a":true,"d":{},"i":{"ref":"pet_ref01","suffix":"_rm0"},"m":{"id":"pet01"},"o":"remove","s":[],"v":[],"index$":3},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"pet_ref01"}}],"index$":4}]}, 'Pet', {"POST /words":{"protocol":"http","operationId":"addPet","responses":{"200":{"description":"pet response","schema":{"type":"object","allOf":[{"type":"object","required":["name"],"properties":{"name":{"type":"string","key$":"name"},"tag":{"type":"string","key$":"tag"}},"x-ref":"#/definitions/NewPet","index$":0},{"required":["id"],"properties":{"id":{"type":"integer","format":"int64","key$":"id"}},"index$":1}],"x-ref":"#/definitions/Pet"}},"default":{"description":"unexpected error","schema":{"type":"object","required":["code","message"],"properties":{"code":{"type":"integer","format":"int32"},"message":{"type":"string"}},"x-ref":"#/definitions/Error"}}},"parameters":[{"name":"pet","in":"body","description":"Pet to add to the store","required":true,"schema":{"type":"object","required":["name"],"properties":{"name":{"type":"string","key$":"name"},"tag":{"type":"string","key$":"tag"}},"x-ref":"#/definitions/NewPet"},"index$":0}],"securitySource":"unspecified","consumes":["application/json"],"produces":["application/json"]},"GET /words":{"protocol":"http","operationId":"findPets","responses":{"200":{"description":"pet response","schema":{"type":"array","items":{"type":"object","allOf":[{"type":"object","required":["name"],"properties":{"name":{"type":"string","key$":"name"},"tag":{"type":"string","key$":"tag"}},"x-ref":"#/definitions/NewPet","index$":0},{"required":["id"],"properties":{"id":{"type":"integer","format":"int64","key$":"id"}},"index$":1}],"x-ref":"#/definitions/Pet"}}},"default":{"description":"unexpected error","schema":{"type":"object","required":["code","message"],"properties":{"code":{"type":"integer","format":"int32"},"message":{"type":"string"}},"x-ref":"#/definitions/Error"}}},"parameters":[{"name":"tags","in":"query","description":"tags to filter by","required":false,"type":"array","collectionFormat":"csv","items":{"type":"string"},"index$":0},{"name":"limit","in":"query","description":"maximum number of results to return","required":false,"type":"integer","format":"int32","index$":1}],"securitySource":"unspecified","consumes":["application/json"],"produces":["application/json"]},"GET /pets/{id}":{"protocol":"http","operationId":"find pet by id","responses":{"200":{"description":"pet response","schema":{"type":"object","allOf":[{"type":"object","required":["name"],"properties":{"name":{"type":"string","key$":"name"},"tag":{"type":"string","key$":"tag"}},"x-ref":"#/definitions/NewPet","index$":0},{"required":["id"],"properties":{"id":{"type":"integer","format":"int64","key$":"id"}},"index$":1}],"x-ref":"#/definitions/Pet"}},"default":{"description":"unexpected error","schema":{"type":"object","required":["code","message"],"properties":{"code":{"type":"integer","format":"int32"},"message":{"type":"string"}},"x-ref":"#/definitions/Error"}}},"parameters":[{"name":"id","in":"path","description":"ID of pet to fetch","required":true,"type":"integer","format":"int64","index$":0}],"securitySource":"unspecified","consumes":["application/json"],"produces":["application/json"]},"DELETE /pets/{id}":{"protocol":"http","operationId":"deletePet","responses":{"204":{"description":"pet deleted"},"default":{"description":"unexpected error","schema":{"type":"object","required":["code","message"],"properties":{"code":{"type":"integer","format":"int32"},"message":{"type":"string"}},"x-ref":"#/definitions/Error"}}},"parameters":[{"name":"id","in":"path","description":"ID of pet to delete","required":true,"type":"integer","format":"int64","index$":0}],"securitySource":"unspecified","consumes":["application/json"],"produces":["application/json"]}})
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
  
