package = "voxgig-sdk-datamuse"
version = "0.0.1-1"
source = {
  -- git+https (GitHub dropped git:// in 2022); pin the install to the release
  -- tag pushed by `make publish`, and point at the lua/ subdir of the monorepo.
  url = "git+https://github.com/voxgig-sdk/datamuse-sdk.git",
  tag = "lua/v0.0.1",
  dir = "datamuse-sdk/lua"
}
description = {
  summary = "Datamuse SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["datamuse_sdk"] = "datamuse_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
