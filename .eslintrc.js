module.exports = {
    "extends": "eslint:recommended",
    "rules": {
        "indent": ["error", 4],
        "linebreak-style": ["error", "unix"],
        "quotes": ["error", "double"],
        "semi": ["error", "always"],

        "comma-dangle": ["error", "always"],
        "no-cond-assign": ["error", "always"],

        "no-console": "off",
    },
    "env": {
        "browser": true,
        "node": true,
        "mocha": true,
    },
    "plugins": [
        "angular"
    ],
    "globals": {
        "angular": true,
    }
}
