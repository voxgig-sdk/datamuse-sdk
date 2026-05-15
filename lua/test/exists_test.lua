-- ProjectName SDK exists test

local sdk = require("datamuse_sdk")

describe("DatamuseSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
