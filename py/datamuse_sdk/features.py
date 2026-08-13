# Datamuse SDK feature factory

from datamuse_sdk.feature.base_feature import DatamuseBaseFeature
from datamuse_sdk.feature.test_feature import DatamuseTestFeature


def _make_feature(name):
    features = {
        "base": lambda: DatamuseBaseFeature(),
        "test": lambda: DatamuseTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
