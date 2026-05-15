<?php
declare(strict_types=1);

// Datamuse SDK exists test

require_once __DIR__ . '/../datamuse_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = DatamuseSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
