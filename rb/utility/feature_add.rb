# Datamuse SDK utility: feature_add
module DatamuseUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
