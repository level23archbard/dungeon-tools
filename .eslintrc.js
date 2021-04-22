module.exports = {
  'root': true,
  'ignorePatterns': [
    'projects/**/*'
  ],
  'overrides': [
    // TS Files
    {
      'files': [
        '*.ts'
      ],
      'parserOptions': {
        'project': [
          'tsconfig.json',
          'e2e/tsconfig.json'
        ],
        'createDefaultProgram': true
      },
      'env': {
        'browser': true,
        'jasmine': true,
      },
      'extends': [
        'eslint:recommended',
        'plugin:@angular-eslint/ng-cli-compat',
        'plugin:@angular-eslint/ng-cli-compat--formatting-add-on',
        'plugin:@angular-eslint/template/process-inline-templates',
        'plugin:import/errors',
        'plugin:import/warnings',
      ],
      'settings': {
        'import/resolver': {
          'node': {
            'extensions': [
              '.js',
              '.ts',
            ]
          }
        }
      },
      'rules': {
        '@angular-eslint/component-selector': [
          'error',
          {
            'type': 'element',
            'prefix': 'lxs',
            'style': 'kebab-case',
          }
        ],
        '@angular-eslint/directive-selector': [
          'error',
          {
            'type': 'attribute',
            'prefix': 'lxs',
            'style': 'camelCase',
          }
        ],
        '@typescript-eslint/member-ordering': 'off',
        'comma-dangle': [
          'error',
          {
            'objects': 'always-multiline',
            'arrays': 'always-multiline',
            'imports': 'always-multiline',
            'exports': 'always-multiline',
            'functions': 'always-multiline',
          }
        ],
        'indent': [
          'error',
          2
        ],
        'import/order': [
          'error',
          {
            'alphabetize': {
              'order': 'asc',
              'caseInsensitive': true,
            },
            'newlines-between': 'always'
          }
        ],
        'no-unused-vars': [
          'error',
          {
            'argsIgnorePattern': '^_',
          }
        ]
      }
    },
    // HTML Files
    {
      'files': [
        '*.html'
      ],
      'extends': [
        'plugin:@angular-eslint/template/recommended'
      ],
      'rules': {}
    }
  ]
}
