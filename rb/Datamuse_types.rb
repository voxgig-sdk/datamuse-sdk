# frozen_string_literal: true

# Typed models for the Datamuse SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Pet entity data model.
#
# @!attribute [rw] id
#   @return [Integer]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] tag
#   @return [String, nil]
Pet = Struct.new(
  :id,
  :name,
  :tag,
  keyword_init: true
)

# Request payload for Pet#load.
#
# @!attribute [rw] id
#   @return [String]
PetLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Match filter for Pet#list (any subset of Pet fields).
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] tag
#   @return [String, nil]
PetListMatch = Struct.new(
  :id,
  :name,
  :tag,
  keyword_init: true
)

# Match filter for Pet#create (any subset of Pet fields).
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] tag
#   @return [String, nil]
PetCreateData = Struct.new(
  :id,
  :name,
  :tag,
  keyword_init: true
)

# Request payload for Pet#remove.
#
# @!attribute [rw] id
#   @return [String]
PetRemoveMatch = Struct.new(
  :id,
  keyword_init: true
)

