<?php
declare(strict_types=1);

// Datamuse SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

DatamuseUtility::setRegistrar(function (DatamuseUtility $u): void {
    $u->clean = [DatamuseClean::class, 'call'];
    $u->done = [DatamuseDone::class, 'call'];
    $u->make_error = [DatamuseMakeError::class, 'call'];
    $u->feature_add = [DatamuseFeatureAdd::class, 'call'];
    $u->feature_hook = [DatamuseFeatureHook::class, 'call'];
    $u->feature_init = [DatamuseFeatureInit::class, 'call'];
    $u->fetcher = [DatamuseFetcher::class, 'call'];
    $u->make_fetch_def = [DatamuseMakeFetchDef::class, 'call'];
    $u->make_context = [DatamuseMakeContext::class, 'call'];
    $u->make_options = [DatamuseMakeOptions::class, 'call'];
    $u->make_request = [DatamuseMakeRequest::class, 'call'];
    $u->make_response = [DatamuseMakeResponse::class, 'call'];
    $u->make_result = [DatamuseMakeResult::class, 'call'];
    $u->make_point = [DatamuseMakePoint::class, 'call'];
    $u->make_spec = [DatamuseMakeSpec::class, 'call'];
    $u->make_url = [DatamuseMakeUrl::class, 'call'];
    $u->param = [DatamuseParam::class, 'call'];
    $u->prepare_auth = [DatamusePrepareAuth::class, 'call'];
    $u->prepare_body = [DatamusePrepareBody::class, 'call'];
    $u->prepare_headers = [DatamusePrepareHeaders::class, 'call'];
    $u->prepare_method = [DatamusePrepareMethod::class, 'call'];
    $u->prepare_params = [DatamusePrepareParams::class, 'call'];
    $u->prepare_path = [DatamusePreparePath::class, 'call'];
    $u->prepare_query = [DatamusePrepareQuery::class, 'call'];
    $u->result_basic = [DatamuseResultBasic::class, 'call'];
    $u->result_body = [DatamuseResultBody::class, 'call'];
    $u->result_headers = [DatamuseResultHeaders::class, 'call'];
    $u->transform_request = [DatamuseTransformRequest::class, 'call'];
    $u->transform_response = [DatamuseTransformResponse::class, 'call'];
});
