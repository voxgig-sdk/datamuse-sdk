-- Datamuse SDK error

local DatamuseError = {}
DatamuseError.__index = DatamuseError


function DatamuseError.new(code, msg, ctx)
  local self = setmetatable({}, DatamuseError)
  self.is_sdk_error = true
  self.sdk = "Datamuse"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function DatamuseError:error()
  return self.msg
end


function DatamuseError:__tostring()
  return self.msg
end


return DatamuseError
