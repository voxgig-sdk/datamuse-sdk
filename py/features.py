# Datamuse SDK feature factory

from feature.base_feature import DatamuseBaseFeature
from feature.test_feature import DatamuseTestFeature


def _make_feature(name):
    features = {
        "base": lambda: DatamuseBaseFeature(),
        "test": lambda: DatamuseTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
