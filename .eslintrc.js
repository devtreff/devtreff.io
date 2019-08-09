module.exports = {
    root: true,
    env: {
        browser: true,
        node: true
    },
    extends: [
        // add more generic rulesets here, such as:
        // 'eslint:recommended',
        'prettier',
        'plugin:@typescript-eslint/recommended',
        'prettier/@typescript-eslint',
        'plugin:prettier/recommended',
        'plugin:vue/recommended',
        '@vue/prettier',
        '@vue/typescript'
    ],
    rules: {
        "no-var-requires": false
        // override/add rules settings here, such as:
        // 'vue/no-unused-vars': 'error'
    }
}