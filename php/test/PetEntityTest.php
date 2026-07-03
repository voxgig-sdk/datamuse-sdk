<?php
declare(strict_types=1);

// Pet entity test

require_once __DIR__ . '/../datamuse_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class PetEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = DatamuseSDK::test(null, null);
        $ent = $testsdk->Pet(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = pet_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["create", "list", "load", "remove"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "pet." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set DATAMUSE_TEST_PET_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // CREATE
        $pet_ref01_ent = $client->Pet(null);
        $pet_ref01_data = Helpers::to_map(Vs::getprop(
            Vs::getpath($setup["data"], "new.pet"), "pet_ref01"));

        [$pet_ref01_data_result, $err] = $pet_ref01_ent->create($pet_ref01_data, null);
        $this->assertNull($err);
        $pet_ref01_data = Helpers::to_map($pet_ref01_data_result);
        $this->assertNotNull($pet_ref01_data);
        $this->assertNotNull($pet_ref01_data["id"]);

        // LIST
        $pet_ref01_match = [];

        [$pet_ref01_list_result, $err] = $pet_ref01_ent->list($pet_ref01_match, null);
        $this->assertNull($err);
        $this->assertIsArray($pet_ref01_list_result);

        $found_item = sdk_select(
            Runner::entity_list_to_data($pet_ref01_list_result),
            ["id" => $pet_ref01_data["id"]]);
        $this->assertNotEmpty($found_item);

        // LOAD
        $pet_ref01_match_dt0 = [
            "id" => $pet_ref01_data["id"],
        ];
        [$pet_ref01_data_dt0_loaded, $err] = $pet_ref01_ent->load($pet_ref01_match_dt0, null);
        $this->assertNull($err);
        $pet_ref01_data_dt0_load_result = Helpers::to_map($pet_ref01_data_dt0_loaded);
        $this->assertNotNull($pet_ref01_data_dt0_load_result);
        $this->assertEquals($pet_ref01_data_dt0_load_result["id"], $pet_ref01_data["id"]);

        // REMOVE
        $pet_ref01_match_rm0 = [
            "id" => $pet_ref01_data["id"],
        ];
        [$_, $err] = $pet_ref01_ent->remove($pet_ref01_match_rm0, null);
        $this->assertNull($err);

        // LIST
        $pet_ref01_match_rt0 = [];

        [$pet_ref01_list_rt0_result, $err] = $pet_ref01_ent->list($pet_ref01_match_rt0, null);
        $this->assertNull($err);
        $this->assertIsArray($pet_ref01_list_rt0_result);

        $not_found_item = sdk_select(
            Runner::entity_list_to_data($pet_ref01_list_rt0_result),
            ["id" => $pet_ref01_data["id"]]);
        $this->assertEmpty($not_found_item);

    }
}

function pet_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/pet/PetTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = DatamuseSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["pet01", "pet02", "pet03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("DATAMUSE_TEST_PET_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "DATAMUSE_TEST_PET_ENTID" => $idmap,
        "DATAMUSE_TEST_LIVE" => "FALSE",
        "DATAMUSE_TEST_EXPLAIN" => "FALSE",
        "DATAMUSE_APIKEY" => "NONE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["DATAMUSE_TEST_PET_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["DATAMUSE_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
                "apikey" => $env["DATAMUSE_APIKEY"],
            ],
            $extra ?? [],
        ]);
        $client = new DatamuseSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["DATAMUSE_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["DATAMUSE_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
