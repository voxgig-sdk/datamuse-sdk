<?php
declare(strict_types=1);

// Datamuse SDK utility: prepare_body

class DatamusePrepareBody
{
    public static function call(DatamuseContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
