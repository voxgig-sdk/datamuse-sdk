<?php
declare(strict_types=1);

// Datamuse SDK utility: feature_hook

class DatamuseFeatureHook
{
    public static function call(DatamuseContext $ctx, string $name): void
    {
        if (!$ctx->client) {
            return;
        }
        $features = $ctx->client->features ?? null;
        if (!$features) {
            return;
        }
        foreach ($features as $f) {
            if (method_exists($f, $name)) {
                $f->$name($ctx);
            }
        }
    }
}
