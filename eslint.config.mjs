/* eslint-disable import/extensions */

import globals from 'globals'
import pluginJs from '@eslint/js'
import tslint from 'typescript-eslint'
import pluginReact from 'eslint-plugin-react'
import sonarjs from 'eslint-plugin-sonarjs'

import browser from 'eslint-config-canonical/configurations/browser.js'
import jsdoc from 'eslint-config-canonical/configurations/jsdoc.js'
import jsxA11y from 'eslint-config-canonical/configurations/jsx-a11y.js'
import module from 'eslint-config-canonical/configurations/module.js'
import node from 'eslint-config-canonical/configurations/node.js'
import react from 'eslint-config-canonical/configurations/react.js'
import regexp from 'eslint-config-canonical/configurations/regexp.js'
import typescript from 'eslint-config-canonical/configurations/typescript.js'

import eslintConfigPrettier from 'eslint-plugin-prettier/recommended'

const OFF = 0
// const WARN = 1
const ERROR = 2

const config = [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  ...tslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  sonarjs.configs.recommended,
  browser.recommended,
  jsdoc.recommended,
  jsxA11y.recommended,
  module.recommended,
  node.recommended,
  react.recommended,
  regexp.recommended,
  typescript.recommended,
  eslintConfigPrettier,
  {
    ignores: [
      '.husky',
      '.prettierrc',
      '.vscode',
      'build',
      'coverage',
      'dist',
      'node_modules',
      '*.config.*',
      'jest*',
      'packages/**/package.json',
      'package.json',
      'packages/**/dist/*',
      'packages/**/*.config.*',
    ],
    rules: {
      'canonical/ prefer-inline-type-import': OFF,
      'import/extensions': [OFF, 'ignorePackages'],
      'no-useless-escape': OFF,
      'prettier/prettier': [
        ERROR,
        {
          arrowParens: 'avoid',
          bracketSameLine: false,
          bracketSpacing: true,
          embeddedLanguageFormatting: 'auto',
          endOfLine: 'lf',
          experimentalTernaries: false,
          htmlWhitespaceSensitivity: 'css',
          insertPragma: false,
          jsxSingleQuote: true,
          printWidth: 120,
          proseWrap: 'preserve',
          quoteProps: 'as-needed',
          requirePragma: false,
          semi: false,
          singleAttributePerLine: false,
          singleQuote: true,
          tabWidth: 2,
          trailingComma: 'all',
          useTabs: false,
          vueIndentScriptAndStyle: false,
        },
      ],
      'regexp/no-useless-escape': OFF,
      'regexp/no-unused-capturing-group': OFF,
      'regexp/strict': OFF,
    },
  },
]

/** @type {import('eslint').Linter.Config[]} */
export default config
