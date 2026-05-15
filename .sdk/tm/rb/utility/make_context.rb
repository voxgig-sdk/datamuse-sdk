# Datamuse SDK utility: make_context
require_relative '../core/context'
module DatamuseUtilities
  MakeContext = ->(ctxmap, basectx) {
    DatamuseContext.new(ctxmap, basectx)
  }
end
