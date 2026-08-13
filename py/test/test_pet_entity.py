# Pet entity test

import json
import os
import time

import pytest

from datamuse_sdk.utility.voxgig_struct import voxgig_struct as vs
from datamuse_sdk import DatamuseSDK
from datamuse_sdk.core import helpers

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner


class TestPetEntity:

    def test_should_create_instance(self):
        testsdk = DatamuseSDK.test(None, None)
        ent = testsdk.Pet(None)
        assert ent is not None

    def test_should_stream(self):
        # Feature #4: the entity stream(action, ...) method runs the op
        # pipeline and yields result items. With the streaming feature active
        # it yields the feature's incremental output; otherwise it falls back
        # to the materialised list so stream always yields.
        seed = {
            "entity": {
                "pet": {
                    "s1": {"id": "s1"},
                    "s2": {"id": "s2"},
                    "s3": {"id": "s3"},
                }
            }
        }

        # Fallback: streaming inactive -> yields the materialised list items.
        base = DatamuseSDK.test(seed, None)
        seen = list(base.Pet(None).stream("list", None, None))
        assert len(seen) == 3

        # Inbound: streaming active -> yields each item from the feature.
        from datamuse_sdk.config import make_config
        cfg = make_config()
        if isinstance(cfg.get("feature"), dict) and "streaming" in cfg["feature"]:
            sdk = DatamuseSDK.test(
                seed, {"feature": {"streaming": {"active": True}}})
            got = []
            for item in sdk.Pet(None).stream("list", None, None):
                if isinstance(item, list):
                    got.extend(item)
                else:
                    got.append(item)
            assert len(got) == 3

    def test_should_run_basic_flow(self):
        setup = _pet_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["create", "list", "load", "remove"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "pet." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        # The basic flow consumes synthetic IDs from the fixture. In live mode
        # without an *_ENTID env override, those IDs hit the live API and 4xx.
        if setup.get("synthetic_only"):
            pytest.skip("live entity test uses synthetic IDs from fixture — "
                        "set DATAMUSE_TEST_PET_ENTID JSON to run live")
        client = setup["client"]

        # CREATE
        pet_ref01_ent = client.Pet(None)
        pet_ref01_data = helpers.to_map(vs.getprop(
            vs.getpath(setup["data"], "new.pet"), "pet_ref01"))

        pet_ref01_data = helpers.to_map(runner.entity_data(pet_ref01_ent.create(pet_ref01_data, None)))
        assert pet_ref01_data is not None
        assert pet_ref01_data["id"] is not None

        # LIST
        pet_ref01_match = {}

        pet_ref01_list_result = pet_ref01_ent.list(pet_ref01_match, None)
        assert isinstance(pet_ref01_list_result, list)

        found_item = vs.select(
            runner.entity_list_to_data(pet_ref01_list_result),
            {"id": pet_ref01_data["id"]})
        assert not vs.isempty(found_item)

        # LOAD
        pet_ref01_match_dt0 = {
            "id": pet_ref01_data["id"],
        }
        pet_ref01_data_dt0_loaded = pet_ref01_ent.load(pet_ref01_match_dt0, None)
        pet_ref01_data_dt0_load_result = helpers.to_map(runner.entity_data(pet_ref01_data_dt0_loaded))
        assert pet_ref01_data_dt0_load_result is not None
        assert pet_ref01_data_dt0_load_result["id"] == pet_ref01_data["id"]

        # REMOVE
        pet_ref01_match_rm0 = {
            "id": pet_ref01_data["id"],
        }
        pet_ref01_ent.remove(pet_ref01_match_rm0, None)

        # LIST
        pet_ref01_match_rt0 = {}

        pet_ref01_list_rt0_result = pet_ref01_ent.list(pet_ref01_match_rt0, None)
        assert isinstance(pet_ref01_list_rt0_result, list)

        not_found_item = vs.select(
            runner.entity_list_to_data(pet_ref01_list_rt0_result),
            {"id": pet_ref01_data["id"]})
        assert vs.isempty(not_found_item)



def _pet_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/pet/PetTestData.json")
    with open(entity_data_file, "r") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = DatamuseSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["pet01", "pet02", "pet03"],
        {
            "`$PACK`": ["", {
                "`$KEY`": "`$COPY`",
                "`$VAL`": ["`$FORMAT`", "upper", "`$COPY`"],
            }],
        }
    )

    # Detect ENTID env override before envOverride consumes it. When live
    # mode is on without a real override, the basic test runs against synthetic
    # IDs from the fixture and 4xx's. We surface this so the test can skip.
    _entid_env_raw = os.environ.get(
        "DATAMUSE_TEST_PET_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "DATAMUSE_TEST_PET_ENTID": idmap,
        "DATAMUSE_TEST_LIVE": "FALSE",
        "DATAMUSE_TEST_EXPLAIN": "FALSE",
    })

    idmap_resolved = helpers.to_map(
        env.get("DATAMUSE_TEST_PET_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)

    if env.get("DATAMUSE_TEST_LIVE") == "TRUE":
        merged_opts = vs.merge([
            {
            },
            extra or {},
        ])
        client = DatamuseSDK(helpers.to_map(merged_opts))

    _live = env.get("DATAMUSE_TEST_LIVE") == "TRUE"
    return {
        "client": client,
        "data": entity_data,
        "idmap": idmap_resolved,
        "env": env,
        "explain": env.get("DATAMUSE_TEST_EXPLAIN") == "TRUE",
        "live": _live,
        "synthetic_only": _live and not _idmap_overridden,
        "now": int(time.time() * 1000),
    }
