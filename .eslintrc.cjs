module.exports = {
    env: {
        browser: true,
        node: true,
        es2024: true,
    },

    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },

    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:prettier/recommended',
        'prettier',
    ],

    plugins: ['react', 'react-hooks', 'react-refresh', 'prettier'],

    globals: {
        Intl: 'readonly',
        FormData: 'readonly',
    },

    rules: {
        indent: ['error', 4, { SwitchCase: 1 }],
        'linebreak-style': ['error', 'unix'],
        quotes: ['error', 'single', { avoidEscape: true }],
        semi: ['error', 'always'],

        'no-console': 'error',
        'no-alert': 'error',

        complexity: 'off',

        'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
        'no-unused-expressions': 'error',

        'no-await-in-loop': 'off',
        'no-async-promise-executor': 'error',

        camelcase: ['error', { allow: ['^.*_.*'] }],
        curly: 'error',

        'consistent-return': 'off',
        'default-case': 'error',
        'default-case-last': 'error',
        'default-param-last': 'error',

        'dot-notation': 'error',
        'prefer-destructuring': 'off',

        eqeqeq: 'warn',
        'no-array-constructor': 'error',

        'no-empty': ['error', { allowEmptyCatch: true }],
        'no-empty-function': 'error',

        'no-else-return': 'error',
        'no-useless-return': 'error',

        'no-eq-null': 'error',
        'no-extra-boolean-cast': 'error',

        'no-lone-blocks': 'error',
        'no-useless-constructor': 'error',
        'no-useless-concat': 'error',

        'no-var': 'error',
        'no-void': 'error',

        'object-shorthand': 'error',
        'prefer-const': 'error',

        // React specific
        'react/react-in-jsx-scope': 'off',
        'react/prop-types': 'off',
        'react/jsx-uses-react': 'off',
        'react/jsx-uses-vars': 'error',

        // Hooks rules
        'react-hooks/rules-of-hooks': 'off',
        'react-hooks/exhaustive-deps': 'off',

        'prettier/prettier': 'warn',
    },

    settings: {
        react: {
            version: 'detect',
        },
    },

    ignorePatterns: [
        'node_modules/',
        'dist/',
        'build/',
        '*.config.*',
        '*.min.*',
        'coverage/',
        '.eslint*',
    ],
};
