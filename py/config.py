# Datamuse SDK configuration


def make_config():
    return {
        "main": {
            "name": "Datamuse",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
      },
        },
        "options": {
            "base": "http://api.datamuse.com",
            "auth": {
                "prefix": "Bearer",
            },
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "pet": {},
            },
        },
        "entity": {
      "pet": {
        "fields": [
          {
            "name": "id",
            "req": True,
            "type": "`$INTEGER`",
            "active": True,
            "index$": 0,
          },
          {
            "name": "name",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 1,
          },
          {
            "name": "tag",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 2,
          },
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
                      "reqd": True,
                      "type": "`$OBJECT`",
                      "active": True,
                    },
                  ],
                },
                "method": "POST",
                "orig": "/words",
                "parts": [
                  "words",
                ],
                "select": {
                  "exist": [
                    "pet",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "create",
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
                      "reqd": False,
                      "type": "`$INTEGER`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "tag",
                      "orig": "tag",
                      "reqd": False,
                      "type": "`$ANY`",
                      "active": True,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/words",
                "parts": [
                  "words",
                ],
                "select": {
                  "exist": [
                    "limit",
                    "tag",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "list",
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
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/pets/{id}",
                "parts": [
                  "pets",
                  "{id}",
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "load",
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
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                },
                "method": "DELETE",
                "orig": "/pets/{id}",
                "parts": [
                  "pets",
                  "{id}",
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "remove",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
