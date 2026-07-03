-- Pet entity test

local json = require("dkjson")
local vs = require("utility.struct.struct")
local sdk = require("datamuse_sdk")
local helpers = require("core.helpers")
local runner = require("test.runner")

local _test_dir = debug.getinfo(1, "S").source:match("^@(.+/)")  or "./"

describe("PetEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:Pet(nil)
    assert.is_not_nil(ent)
  end)

  it("should run basic flow", function()
    local setup = pet_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"create", "list", "load", "remove"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "pet." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    -- The basic flow consumes synthetic IDs from the fixture. In live mode
    -- without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup.synthetic_only then
      pending("live entity test uses synthetic IDs from fixture — set DATAMUSE_TEST_PET_ENTID JSON to run live")
      return
    end
    local client = setup.client

    -- CREATE
    local pet_ref01_ent = client:Pet(nil)
    local pet_ref01_data = helpers.to_map(vs.getprop(
      vs.getpath(setup.data, "new.pet"), "pet_ref01"))

    local pet_ref01_data_result, err = pet_ref01_ent:create(pet_ref01_data, nil)
    assert.is_nil(err)
    pet_ref01_data = helpers.to_map(pet_ref01_data_result)
    assert.is_not_nil(pet_ref01_data)
    assert.is_not_nil(pet_ref01_data["id"])

    -- LIST
    local pet_ref01_match = {}

    local pet_ref01_list_result, err = pet_ref01_ent:list(pet_ref01_match, nil)
    assert.is_nil(err)
    assert.is_table(pet_ref01_list_result)

    local found_item = vs.select(
      runner.entity_list_to_data(pet_ref01_list_result),
      { id = pet_ref01_data["id"] })
    assert.is_false(vs.isempty(found_item))

    -- LOAD
    local pet_ref01_match_dt0 = {
      id = pet_ref01_data["id"],
    }
    local pet_ref01_data_dt0_loaded, err = pet_ref01_ent:load(pet_ref01_match_dt0, nil)
    assert.is_nil(err)
    local pet_ref01_data_dt0_load_result = helpers.to_map(pet_ref01_data_dt0_loaded)
    assert.is_not_nil(pet_ref01_data_dt0_load_result)
    assert.are.equal(pet_ref01_data_dt0_load_result["id"], pet_ref01_data["id"])

    -- REMOVE
    local pet_ref01_match_rm0 = {
      id = pet_ref01_data["id"],
    }
    local _, err = pet_ref01_ent:remove(pet_ref01_match_rm0, nil)
    assert.is_nil(err)

    -- LIST
    local pet_ref01_match_rt0 = {}

    local pet_ref01_list_rt0_result, err = pet_ref01_ent:list(pet_ref01_match_rt0, nil)
    assert.is_nil(err)
    assert.is_table(pet_ref01_list_rt0_result)

    local not_found_item = vs.select(
      runner.entity_list_to_data(pet_ref01_list_rt0_result),
      { id = pet_ref01_data["id"] })
    assert.is_true(vs.isempty(not_found_item))

  end)
end)

function pet_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/pet/PetTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read pet test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "pet01", "pet02", "pet03" },
    {
      ["`$PACK`"] = { "", {
        ["`$KEY`"] = "`$COPY`",
        ["`$VAL`"] = { "`$FORMAT`", "upper", "`$COPY`" },
      }},
    }
  )

  -- Detect ENTID env override before envOverride consumes it. When live
  -- mode is on without a real override, the basic test runs against synthetic
  -- IDs from the fixture and 4xx's. Surface this so the test can skip.
  local entid_env_raw = os.getenv("DATAMUSE_TEST_PET_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["DATAMUSE_TEST_PET_ENTID"] = idmap,
    ["DATAMUSE_TEST_LIVE"] = "FALSE",
    ["DATAMUSE_TEST_EXPLAIN"] = "FALSE",
    ["DATAMUSE_APIKEY"] = "NONE",
  })

  local idmap_resolved = helpers.to_map(
    env["DATAMUSE_TEST_PET_ENTID"])
  if idmap_resolved == nil then
    idmap_resolved = helpers.to_map(idmap)
  end

  if env["DATAMUSE_TEST_LIVE"] == "TRUE" then
    local merged_opts = vs.merge({
      {
        apikey = env["DATAMUSE_APIKEY"],
      },
      extra or {},
    })
    client = sdk.new(helpers.to_map(merged_opts))
  end

  local live = env["DATAMUSE_TEST_LIVE"] == "TRUE"
  return {
    client = client,
    data = entity_data,
    idmap = idmap_resolved,
    env = env,
    explain = env["DATAMUSE_TEST_EXPLAIN"] == "TRUE",
    live = live,
    synthetic_only = live and not idmap_overridden,
    now = os.time() * 1000,
  }
end
