module.exports = {
    roots: [
        "<rootDir>/test"
    ],
    testRegex: "test/(.+)\\.Test\\.(jsx?|tsx?)$",
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    },
    globals: {
        "ts-jest": {
            tsconfig: "<rootDir>/tsconfig.jest.json"
        }
    },
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    coverageDirectory: "test/log",
    testTimeout: 600000
};