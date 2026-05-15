<?php
declare(strict_types=1);

// Datamuse SDK configuration

class DatamuseConfig
{
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "Datamuse",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
        ],
            ],
            "options" => [
                "base" => "http://api.datamuse.com",
                "auth" => [
                    "prefix" => "Bearer",
                ],
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "pet" => [],
                ],
            ],
            "entity" => [
        'pet' => [
          'fields' => [
            [
              'name' => 'id',
              'req' => true,
              'type' => '`$INTEGER`',
              'active' => true,
              'index$' => 0,
            ],
            [
              'name' => 'name',
              'req' => true,
              'type' => '`$STRING`',
              'active' => true,
              'index$' => 1,
            ],
            [
              'name' => 'tag',
              'req' => false,
              'type' => '`$STRING`',
              'active' => true,
              'index$' => 2,
            ],
          ],
          'name' => 'pet',
          'op' => [
            'create' => [
              'name' => 'create',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'pet',
                        'orig' => 'pet',
                        'reqd' => true,
                        'type' => '`$OBJECT`',
                        'active' => true,
                      ],
                    ],
                  ],
                  'method' => 'POST',
                  'orig' => '/words',
                  'parts' => [
                    'words',
                  ],
                  'select' => [
                    'exist' => [
                      'pet',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'active' => true,
                  'index$' => 0,
                ],
              ],
              'input' => 'data',
              'key$' => 'create',
            ],
            'list' => [
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'limit',
                        'orig' => 'limit',
                        'reqd' => false,
                        'type' => '`$INTEGER`',
                        'active' => true,
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'tag',
                        'orig' => 'tag',
                        'reqd' => false,
                        'type' => '`$ANY`',
                        'active' => true,
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/words',
                  'parts' => [
                    'words',
                  ],
                  'select' => [
                    'exist' => [
                      'limit',
                      'tag',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'active' => true,
                  'index$' => 0,
                ],
              ],
              'input' => 'data',
              'key$' => 'list',
            ],
            'load' => [
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/pets/{id}',
                  'parts' => [
                    'pets',
                    '{id}',
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'active' => true,
                  'index$' => 0,
                ],
              ],
              'input' => 'data',
              'key$' => 'load',
            ],
            'remove' => [
              'name' => 'remove',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                    ],
                  ],
                  'method' => 'DELETE',
                  'orig' => '/pets/{id}',
                  'parts' => [
                    'pets',
                    '{id}',
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'active' => true,
                  'index$' => 0,
                ],
              ],
              'input' => 'data',
              'key$' => 'remove',
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return DatamuseFeatures::make_feature($name);
    }
}
