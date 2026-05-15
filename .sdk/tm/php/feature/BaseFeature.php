<?php
declare(strict_types=1);

// Datamuse SDK base feature

class DatamuseBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(DatamuseContext $ctx, array $options): void {}
    public function PostConstruct(DatamuseContext $ctx): void {}
    public function PostConstructEntity(DatamuseContext $ctx): void {}
    public function SetData(DatamuseContext $ctx): void {}
    public function GetData(DatamuseContext $ctx): void {}
    public function GetMatch(DatamuseContext $ctx): void {}
    public function SetMatch(DatamuseContext $ctx): void {}
    public function PrePoint(DatamuseContext $ctx): void {}
    public function PreSpec(DatamuseContext $ctx): void {}
    public function PreRequest(DatamuseContext $ctx): void {}
    public function PreResponse(DatamuseContext $ctx): void {}
    public function PreResult(DatamuseContext $ctx): void {}
    public function PreDone(DatamuseContext $ctx): void {}
    public function PreUnexpected(DatamuseContext $ctx): void {}
}
