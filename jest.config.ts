export default {
    "collectCoverage": true,
    "collectCoverageFrom": [
        "src/*.{js,ts}",
        "src/**/*.{js,ts}"
    ],
    "coverageDirectory": "./test/coverage",
    "coveragePathIgnorePatterns": [
        "/node_modules/",
        "/test/"
    ],
    "coverageThreshold": {
        "global": {
            "branches": 85,
            "functions": 95,
            "lines": 95,
            "statements": 95
        }
    },
    "moduleFileExtensions": [
        "ts",
        "tsx",
        "js"
    ],
    "testRegex": "/test/unit/.*\\.(test|spec)\\.(ts)$",
    "transform": {
        ".(ts|tsx)": "ts-jest"
    }
}
