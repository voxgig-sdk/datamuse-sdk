<?php
declare(strict_types=1);

// Datamuse SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class DatamuseFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new DatamuseBaseFeature();
            case "test":
                return new DatamuseTestFeature();
            default:
                return new DatamuseBaseFeature();
        }
    }
}
