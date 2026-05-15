<?php
declare(strict_types=1);

// Datamuse SDK utility: feature_add

class DatamuseFeatureAdd
{
    public static function call(DatamuseContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
