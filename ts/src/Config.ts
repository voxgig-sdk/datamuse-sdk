
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature

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
    }

  }


  options = {
    base: 'http://api.datamuse.com',

    auth: {
      prefix: 'Bearer',
    },

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
          "name": "id",
          "req": true,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 0
        },
        {
          "name": "name",
          "req": true,
          "type": "`$STRING`",
          "active": true,
          "index$": 1
        },
        {
          "name": "tag",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 2
        }
      ],
      "name": "pet",
      "op": {
        "create": {
          "name": "create",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "kind": "query",
                    "name": "pet",
                    "orig": "pet",
                    "reqd": true,
                    "type": "`$OBJECT`",
                    "active": true
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
              "active": true,
              "index$": 0
            }
          ],
          "input": "data",
          "key$": "create"
        },
        "list": {
          "name": "list",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "kind": "query",
                    "name": "limit",
                    "orig": "limit",
                    "reqd": false,
                    "type": "`$INTEGER`",
                    "active": true
                  },
                  {
                    "kind": "query",
                    "name": "tag",
                    "orig": "tag",
                    "reqd": false,
                    "type": "`$ANY`",
                    "active": true
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
              "active": true,
              "index$": 0
            }
          ],
          "input": "data",
          "key$": "list"
        },
        "load": {
          "name": "load",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$STRING`",
                    "active": true
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
              "active": true,
              "index$": 0
            }
          ],
          "input": "data",
          "key$": "load"
        },
        "remove": {
          "name": "remove",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$STRING`",
                    "active": true
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
              "active": true,
              "index$": 0
            }
          ],
          "input": "data",
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

