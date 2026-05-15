<?php
declare(strict_types=1);

// Datamuse SDK utility: result_headers

class DatamuseResultHeaders
{
    public static function call(DatamuseContext $ctx): ?DatamuseResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
