module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "airbnb-typescript",
        "react-app",
        "prettier"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "project": "./tsconfig.json"
    },
    "plugins": [
        "prettier",
        "@typescript-eslint",
        "react-hooks"
    ],
    /**
   * "off" 或 0 - 关闭规则
   * "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出),
   * "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
   */
    "rules": {
        "object-curly-spacing": ["warn", "always"],
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn",
        "no-unused-vars": [
            "warn",
            {
                "vars": "all",
                "args": "none"
            }
        ],
        "@typescript-eslint/no-unused-vars": [
            "warn",
            {
                "vars": "all",
                "args": "none"
            }
        ],
        "max-len": [
            "warn",
            {
                "code": 150,
                "ignoreStrings": true,
                "ignoreTemplateLiterals": true,
                "ignoreComments": true
            }
        ],
        "no-plusplus": [
            "error",
            {
                "allowForLoopAfterthoughts": true
            }
        ],
        "react/jsx-key": "error",
        "import/extensions": "off",
        "import/no-extraneous-dependencies": "off",
        "react/jsx-props-no-spreading": "off",
        "import/prefer-default-export": "off",
        "react/jsx-boolean-value": "off",
        "react/prop-types": "off",
        "react/no-unescaped-entities": "off",
        "react/jsx-one-expression-per-line": "off",
        "react/jsx-wrap-multilines": "off",
        "react/destructuring-assignment": "off",
        "no-continue": "off",
        "react/state-in-constructor": "off",
        "react/react-in-jsx-scope": "off",
        "no-console": "off",
        "no-debugger": "off",
        "class-methods-use-this": "off",
        "jsx-a11y/click-events-have-key-events": "off",
        "jsx-a11y/no-noninteractive-element-interactions": "off",
        "react/no-danger": "off",
        "no-param-reassign": "off",
        "jsx-a11y/label-has-associated-control": "off",
        "jsx-a11y/interactive-supports-focus": "off",
        "no-underscore-dangle": "off",
        "react/button-has-type": "off",
        "operator-assignment": "off",
        "react/static-property-placement": "off",
        "max-classes-per-file": ["warn", 20],
        "react/jsx-curly-brace-presence": "off",
        "import/no-named-as-default": "off",
        "import/no-named-as-default-member": "off",
        "react/require-default-props": "off",
        "prefer-destructuring": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/camelcase": "off",
        "@typescript-eslint/indent": "off",
        "prefer-rest-params": "off",
        "no-bitwise": "off"

    }
};
