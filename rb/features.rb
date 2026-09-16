# Datamuse SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module DatamuseFeatures
  def self.make_feature(name)
    case name
    when "base"
      DatamuseBaseFeature.new
    when "ratelimit"
      DatamuseRatelimitFeature.new
    when "retry"
      DatamuseRetryFeature.new
    when "test"
      DatamuseTestFeature.new
    when "timeout"
      DatamuseTimeoutFeature.new
    else
      DatamuseBaseFeature.new
    end
  end
end
