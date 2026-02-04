import js from '@eslint/js';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from "globals";

export default [
	{
		files: ['**/*.{js,jsx}'],

		...js.configs.recommended,

		plugins: {
			react,
			'react-hooks': reactHooks,
			'react-refresh': reactRefresh,
		},

		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
            parserOptions: {
                ecmaFeatures: {
                    jsx: true
                }
            },
			globals: {
				Intl: "readonly",
				FormData: "readonly",
				...globals.browser,
				...globals.node,
			},

		},

		rules: {
			indent: ['error', 4],
			'linebreak-style': ['error', 'unix'],
			quotes: ['error', 'single'],
			semi: ['error', 'always'],

			'no-console': 'warn',
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
		},

		settings: {
			react: {
				version: 'detect',
			},
		},
	},

	{
		ignores: ['node_modules/', 'dist/', 'build/', '*.config.*', '*.min.*', 'coverage/'],
	},
];
