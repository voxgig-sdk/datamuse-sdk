package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/datamuse-sdk/go"
	"github.com/voxgig-sdk/datamuse-sdk/go/core"

	vs "github.com/voxgig-sdk/datamuse-sdk/go/utility/struct"
)

func TestPetEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Pet(nil)
		if ent == nil {
			t.Fatal("expected non-nil PetEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := petBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "pet." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set DATAMUSE_TEST_PET_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		petRef01Ent := client.Pet(nil)
		petRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath([]any{"new", "pet"}, setup.data), "pet_ref01"))

		petRef01DataResult, err := petRef01Ent.Create(petRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		petRef01Data = core.ToMapAny(petRef01DataResult)
		if petRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if petRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		// LIST
		petRef01Match := map[string]any{}

		petRef01ListResult, err := petRef01Ent.List(petRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		petRef01List, petRef01ListOk := petRef01ListResult.([]any)
		if !petRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", petRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(petRef01List), map[string]any{"id": petRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		// LOAD
		petRef01MatchDt0 := map[string]any{
			"id": petRef01Data["id"],
		}
		petRef01DataDt0Loaded, err := petRef01Ent.Load(petRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		petRef01DataDt0LoadResult := core.ToMapAny(petRef01DataDt0Loaded)
		if petRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if petRef01DataDt0LoadResult["id"] != petRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

		// REMOVE
		petRef01MatchRm0 := map[string]any{
			"id": petRef01Data["id"],
		}
		_, err = petRef01Ent.Remove(petRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

		// LIST
		petRef01MatchRt0 := map[string]any{}

		petRef01ListRt0Result, err := petRef01Ent.List(petRef01MatchRt0, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		petRef01ListRt0, petRef01ListRt0Ok := petRef01ListRt0Result.([]any)
		if !petRef01ListRt0Ok {
			t.Fatalf("expected list result to be an array, got %T", petRef01ListRt0Result)
		}

		notFoundItem := vs.Select(entityListToData(petRef01ListRt0), map[string]any{"id": petRef01Data["id"]})
		if !vs.IsEmpty(notFoundItem) {
			t.Fatal("expected removed entity to not be in list")
		}

	})
}

func petBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "pet", "PetTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read pet test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse pet test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"pet01", "pet02", "pet03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("DATAMUSE_TEST_PET_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"DATAMUSE_TEST_PET_ENTID": idmap,
		"DATAMUSE_TEST_LIVE":      "FALSE",
		"DATAMUSE_TEST_EXPLAIN":   "FALSE",
		"DATAMUSE_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["DATAMUSE_TEST_PET_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["DATAMUSE_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["DATAMUSE_APIKEY"],
			},
			extra,
		})
		client = sdk.NewDatamuseSDK(core.ToMapAny(mergedOpts))
	}

	live := env["DATAMUSE_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["DATAMUSE_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
