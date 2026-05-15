# Datamuse SDK utility: make_context

from core.context import DatamuseContext


def make_context_util(ctxmap, basectx):
    return DatamuseContext(ctxmap, basectx)
