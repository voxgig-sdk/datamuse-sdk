# Datamuse SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

DatamuseUtility.registrar = ->(u) {
  u.clean = DatamuseUtilities::Clean
  u.done = DatamuseUtilities::Done
  u.make_error = DatamuseUtilities::MakeError
  u.feature_add = DatamuseUtilities::FeatureAdd
  u.feature_hook = DatamuseUtilities::FeatureHook
  u.feature_init = DatamuseUtilities::FeatureInit
  u.fetcher = DatamuseUtilities::Fetcher
  u.make_fetch_def = DatamuseUtilities::MakeFetchDef
  u.make_context = DatamuseUtilities::MakeContext
  u.make_options = DatamuseUtilities::MakeOptions
  u.make_request = DatamuseUtilities::MakeRequest
  u.make_response = DatamuseUtilities::MakeResponse
  u.make_result = DatamuseUtilities::MakeResult
  u.make_point = DatamuseUtilities::MakePoint
  u.make_spec = DatamuseUtilities::MakeSpec
  u.make_url = DatamuseUtilities::MakeUrl
  u.param = DatamuseUtilities::Param
  u.prepare_auth = DatamuseUtilities::PrepareAuth
  u.prepare_body = DatamuseUtilities::PrepareBody
  u.prepare_headers = DatamuseUtilities::PrepareHeaders
  u.prepare_method = DatamuseUtilities::PrepareMethod
  u.prepare_params = DatamuseUtilities::PrepareParams
  u.prepare_path = DatamuseUtilities::PreparePath
  u.prepare_query = DatamuseUtilities::PrepareQuery
  u.result_basic = DatamuseUtilities::ResultBasic
  u.result_body = DatamuseUtilities::ResultBody
  u.result_headers = DatamuseUtilities::ResultHeaders
  u.transform_request = DatamuseUtilities::TransformRequest
  u.transform_response = DatamuseUtilities::TransformResponse
}
