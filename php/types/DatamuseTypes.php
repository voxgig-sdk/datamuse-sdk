<?php
declare(strict_types=1);

// Typed models for the Datamuse SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Pet entity data model. */
class Pet
{
    public int $id;
    public string $name;
    public ?string $tag = null;
}

/** Request payload for Pet#load. */
class PetLoadMatch
{
    public string $id;
}

/** Request payload for Pet#list. */
class PetListMatch
{
    public ?int $id = null;
    public ?string $name = null;
    public ?string $tag = null;
}

/** Request payload for Pet#create. */
class PetCreateData
{
    public int $id;
    public string $name;
    public ?string $tag = null;
}

/** Request payload for Pet#remove. */
class PetRemoveMatch
{
    public string $id;
}

