# Datamuse SDK exists test

require "minitest/autorun"
require_relative "../Datamuse_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = DatamuseSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
