// Typed models for the Datamuse SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Pet {
  id: number
  name: string
  tag?: string
}

export interface PetLoadMatch {
  id: string
}

export type PetListMatch = Partial<Pet>

export type PetCreateData = Partial<Pet>

export interface PetRemoveMatch {
  id: string
}

