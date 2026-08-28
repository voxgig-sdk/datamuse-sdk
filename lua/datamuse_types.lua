-- Typed models for the Datamuse SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Pet
---@field id number
---@field name string
---@field tag? string

---@class PetLoadMatch
---@field id string

---@class PetListMatch
---@field limit? number
---@field tag? any

---@class PetCreateData
---@field pet table
---@field id number
---@field name string
---@field tag? string

---@class PetRemoveMatch
---@field id string

local M = {}

return M
