package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewPetEntityFunc func(client *DatamuseSDK, entopts map[string]any) DatamuseEntity

