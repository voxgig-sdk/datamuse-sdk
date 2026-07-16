
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }


  main = {
    name: 'ProjectName',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    },

  }


  options = {
    base: 'http://api.datamuse.com',

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      pet: {
      },

    }
  }


  entity = {
    "pet": {
      "fields": [
        {
          "active": true,
          "name": "id",
          "req": true,
          "type": "`$INTEGER`",
          "index$": 0
        },
        {
          "active": true,
          "name": "name",
          "req": true,
          "type": "`$STRING`",
          "index$": 1
        },
        {
          "active": true,
          "name": "tag",
          "req": false,
          "type": "`$STRING`",
          "index$": 2
        }
      ],
      "name": "pet",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "active": true,
              "args": {
                "query": [
                  {
                    "active": true,
                    "kind": "query",
                    "name": "pet",
                    "orig": "pet",
                    "reqd": true,
                    "type": "`$OBJECT`"
                  }
                ]
              },
              "method": "POST",
              "orig": "/words",
              "parts": [
                "words"
              ],
              "select": {
                "exist": [
                  "pet"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "index$": 0
            }
          ],
          "key$": "create"
        },
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "active": true,
              "args": {
                "query": [
                  {
                    "active": true,
                    "kind": "query",
                    "name": "limit",
                    "orig": "limit",
                    "reqd": false,
                    "type": "`$INTEGER`"
                  },
                  {
                    "active": true,
                    "kind": "query",
                    "name": "tag",
                    "orig": "tag",
                    "reqd": false,
                    "type": "`$ANY`"
                  }
                ]
              },
              "method": "GET",
              "orig": "/words",
              "parts": [
                "words"
              ],
              "select": {
                "exist": [
                  "limit",
                  "tag"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "index$": 0
            }
          ],
          "key$": "list"
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 0
                  }
                ]
              },
              "method": "GET",
              "orig": "/pets/{id}",
              "parts": [
                "pets",
                "{id}"
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "index$": 0
            }
          ],
          "key$": "load"
        },
        "remove": {
          "input": "data",
          "name": "remove",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 0
                  }
                ]
              },
              "method": "DELETE",
              "orig": "/pets/{id}",
              "parts": [
                "pets",
                "{id}"
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "index$": 0
            }
          ],
          "key$": "remove"
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config
}

