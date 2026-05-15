package = "voxgig-sdk-datamuse"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/datamuse-sdk.git"
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
