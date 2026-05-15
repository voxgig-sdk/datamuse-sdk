<?php
declare(strict_types=1);

// Datamuse SDK utility: result_body

class DatamuseResultBody
{
    public static function call(DatamuseContext $ctx): ?DatamuseResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
