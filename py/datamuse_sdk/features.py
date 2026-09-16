# Datamuse SDK feature factory

from datamuse_sdk.feature.base_feature import DatamuseBaseFeature
from datamuse_sdk.feature.ratelimit_feature import DatamuseRatelimitFeature
from datamuse_sdk.feature.retry_feature import DatamuseRetryFeature
from datamuse_sdk.feature.test_feature import DatamuseTestFeature
from datamuse_sdk.feature.timeout_feature import DatamuseTimeoutFeature


_FEATURES = {
    "base": lambda: DatamuseBaseFeature(),
    "ratelimit": lambda: DatamuseRatelimitFeature(),
    "retry": lambda: DatamuseRetryFeature(),
    "test": lambda: DatamuseTestFeature(),
    "timeout": lambda: DatamuseTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
