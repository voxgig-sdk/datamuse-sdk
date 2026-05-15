<?php
declare(strict_types=1);

// Datamuse SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class DatamuseMakeContext
{
    public static function call(array $ctxmap, ?DatamuseContext $basectx): DatamuseContext
    {
        return new DatamuseContext($ctxmap, $basectx);
    }
}
