# Datamuse SDK configuration

module DatamuseConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "Datamuse",
        "slug" => "datamuse",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "ratelimit" => {
          "options" => {
            "active" => false,
            "burst" => 5,
            "rate" => 5,
          },
          "optspec" => {
            "now" => "`$FUNCTION`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "retry" => {
          "options" => {
            "active" => false,
            "factor" => 2,
            "maxDelay" => 2000,
            "minDelay" => 50,
            "retries" => 2,
            "statuses" => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          },
          "optspec" => {
            "jitter" => "`$BOOLEAN`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "test" => {
          "options" => {
            "active" => false,
          },
          "optspec" => {
            "entity" => "`$MAP`",
            "net" => "`$MAP`",
          },
          "strict" => false,
          "transport" => "base",
        },
        "timeout" => {
          "options" => {
            "active" => false,
            "ms" => 30000,
          },
          "optspec" => {
            "clearTimer" => "`$FUNCTION`",
            "setTimer" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
      },
      "options" => {
        "base" => "http://api.datamuse.com",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "pet" => {},
        },
      },
      "entity" => {
        "pet" => {
          "fields" => [
            {
              "name" => "id",
              "title" => "Id",
              "type" => "`$INTEGER`",
              "req" => true,
              "format" => "int64",
            },
            {
              "name" => "name",
              "title" => "Name",
              "type" => "`$STRING`",
              "req" => true,
            },
            {
              "name" => "tag",
              "title" => "Tag",
              "type" => "`$STRING`",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "pet",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/words",
                  "segments" => [
                    {
                      "lit" => "words",
                    },
                  ],
                  "parts" => [
                    "words",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "pet",
                        "orig" => "pet",
                        "type" => "`$OBJECT`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "pet",
                    ],
                  },
                },
              ],
            },
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/words",
                  "segments" => [
                    {
                      "lit" => "words",
                    },
                  ],
                  "parts" => [
                    "words",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "limit",
                        "orig" => "limit",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                      },
                      {
                        "name" => "tag",
                        "orig" => "tag",
                        "type" => "`$ANY`",
                        "kind" => "query",
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "limit",
                      "tag",
                    ],
                  },
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/pets/{id}",
                  "segments" => [
                    {
                      "lit" => "pets",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "parts" => [
                    "pets",
                    "{id}",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "id",
                        "orig" => "id",
                        "type" => "`$STRING`",
                        "kind" => "param",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                },
              ],
            },
            "remove" => {
              "input" => "data",
              "name" => "remove",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "DELETE",
                  "orig" => "/pets/{id}",
                  "segments" => [
                    {
                      "lit" => "pets",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "parts" => [
                    "pets",
                    "{id}",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "id",
                        "orig" => "id",
                        "type" => "`$STRING`",
                        "kind" => "param",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    DatamuseFeatures.make_feature(name)
  end
end
