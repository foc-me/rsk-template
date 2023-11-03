/** @type {import("ts-jest").JestConfigWithTsJest} */
module.exports = {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    moduleNameMapper: {
        "^lib/(.*)$": "<rootDir>/lib/$1",
        "^lib/": "<rootDir>/lib"
    }
}