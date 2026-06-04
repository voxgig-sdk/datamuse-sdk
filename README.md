# Datamuse SDK

Find words that match constraints on meaning, sound, spelling, and context

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Datamuse API

The [Datamuse API](https://www.datamuse.com/api/) is a word-finding query engine for developers, created by Doug Beeferman. Applications use it to find words matching constraints on meaning, spelling, sound, and surrounding context — useful for writing tools, vocabulary games, crossword helpers, autocomplete, and similar linguistic features.

What you get from the API:

- `/words` — return words matching one or more constraints (means-like `ml`, sounds-like `sl`, spelled-like `sp`, lexical relations via `rel_[code]`, topic hints via `topics`, left/right context via `lc`/`rc`).
- `/sug` — autocomplete suggestions with spelling correction for partial input.
- Optional `md` flags return metadata such as definitions, parts of speech, syllable counts, pronunciation, and word frequency.
- `max` controls result size (default 100, up to 1000); `v` selects vocabulary (English default, Spanish via `es`).
- Responses are JSON arrays of objects with a `word` string and a `score` integer.

No API key or authentication is required for standard usage. The free tier allows up to roughly 100,000 requests per day before rate limiting may apply.

## Try it

**TypeScript**
```bash
npm install datamuse
```

**Python**
```bash
pip install datamuse-sdk
```

**PHP**
```bash
composer require voxgig/datamuse-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/datamuse-sdk/go
```

**Ruby**
```bash
gem install datamuse-sdk
```

**Lua**
```bash
luarocks install datamuse-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { DatamuseSDK } from 'datamuse'

const client = new DatamuseSDK({})

// List all pets
const pets = await client.Pet().list()
```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o datamuse-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "datamuse": {
      "command": "/abs/path/to/datamuse-mcp"
    }
  }
}
```

## Entities

The API exposes one entity:

| Entity | Description | API path |
| --- | --- | --- |
| **Pet** | Despite the name, this entity covers the API's word-result resources — JSON objects with `word` and `score` returned from the `/words` and `/sug` endpoints, not animals. | `/words` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from datamuse_sdk import DatamuseSDK

client = DatamuseSDK({})

# List all pets
pets, err = client.Pet(None).list(None, None)

# Load a specific pet
pet, err = client.Pet(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'datamuse_sdk.php';

$client = new DatamuseSDK([]);

// List all pets
[$pets, $err] = $client->Pet(null)->list(null, null);

// Load a specific pet
[$pet, $err] = $client->Pet(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/datamuse-sdk/go"

client := sdk.NewDatamuseSDK(map[string]any{})

// List all pets
pets, err := client.Pet(nil).List(nil, nil)
```

### Ruby

```ruby
require_relative "Datamuse_sdk"

client = DatamuseSDK.new({})

# List all pets
pets, err = client.Pet(nil).list(nil, nil)

# Load a specific pet
pet, err = client.Pet(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("datamuse_sdk")

local client = sdk.new({})

-- List all pets
local pets, err = client:Pet(nil):list(nil, nil)

-- Load a specific pet
local pet, err = client:Pet(nil):load(
  { id = "example_id" }, nil
)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = DatamuseSDK.test()
const result = await client.Pet().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = DatamuseSDK.test(None, None)
result, err = client.Pet(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = DatamuseSDK::test(null, null);
[$result, $err] = $client->Pet(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Pet(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = DatamuseSDK.test(nil, nil)
result, err = client.Pet(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Pet(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the Datamuse API

- Upstream: [https://www.datamuse.com/api/](https://www.datamuse.com/api/)

- Free to use without an API key for up to 100,000 requests per day; heavier use may be rate-limited.
- Please acknowledge the Datamuse API in your app's documentation when used publicly.
- No authentication is required for standard usage.

---

Generated from the Datamuse API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
