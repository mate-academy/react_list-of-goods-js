module.exports = {
  env: {
    browser: true,
    es2024: true
  },
  extends: [
    'standard',
    'plugin:react/recommended',
    'airbnb',
    'plugin:prettier/recommended',
    'plugin:cypress/recommended'
  ],
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['jsx-a11y', 'import', 'react', 'prettier'],
  rules: {
    // 🧹 Formatação
    'prettier/prettier': [
      'error',
      {
        arrowParens: 'avoid',
        singleQuote: true,
        tabWidth: 2,
        trailingComma: 'none',
        semi: true,
        bracketSpacing: true,
        bracketSameLine: false,
        printWidth: 80
      }
    ],

    // ✅ Permitir arrow functions sem parênteses
    'arrow-parens': ['error', 'as-needed'],

    // ✅ Desativar vírgulas finais obrigatórias
    'comma-dangle': ['error', 'never'],

    // ✅ Indentação flexível
    indent: ['error', 2, { SwitchCase: 1 }],

    // ✅ Evitar conflito com JSX
    'react/react-in-jsx-scope': 'off',

    // ✅ Não exigir default export
    'import/prefer-default-export': 'off',

    // ✅ Permitir JSX em arquivos .js
    'react/jsx-filename-extension': ['warn', { extensions: ['.js', '.jsx'] }],

    // ✅ Remover exigência de props destructuring
    'react/destructuring-assignment': 'off',

    // ✅ Não exigir arrow functions nomeadas de forma específica
    'react/function-component-definition': 'off',

    // ✅ Desativar preferências de vírgulas múltiplas
    'function-paren-newline': 'off',

    // ✅ Permitir ternários simples
    'no-unused-expressions': 'off',

    // ✅ Flexibilizar espaçamento e linhas
    'padding-line-between-statements': 'off',

    // ✅ Ignorar import ordem do Airbnb
    'import/order': 'off',

    // ✅ Permitir console.log se quiser
    'no-console': 'off',

    // ✅ Evitar conflitos visuais em JSX
    'implicit-arrow-linebreak': 'off',

    // ✅ Evitar erro de "no-shadow" em hooks
    'no-shadow': 'off',

    'jsx-a11y/control-has-associated-label': 'off',

    'jsx-a11y/label-has-associated-control': 'off',
  }
};
