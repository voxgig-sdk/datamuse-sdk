package voxgigdatamusesdk

import (
	"github.com/voxgig-sdk/datamuse-sdk/go/core"
	"github.com/voxgig-sdk/datamuse-sdk/go/entity"
	"github.com/voxgig-sdk/datamuse-sdk/go/feature"
	_ "github.com/voxgig-sdk/datamuse-sdk/go/utility"
)

// Type aliases preserve external API.
type DatamuseSDK = core.DatamuseSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type DatamuseEntity = core.DatamuseEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type DatamuseError = core.DatamuseError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewPetEntityFunc = func(client *core.DatamuseSDK, entopts map[string]any) core.DatamuseEntity {
		return entity.NewPetEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewDatamuseSDK = core.NewDatamuseSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
