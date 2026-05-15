# ProjectName SDK exists test

import pytest
from datamuse_sdk import DatamuseSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = DatamuseSDK.test(None, None)
        assert testsdk is not None
