export default {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    transform: {
        "^.+\\.tsx?$": "ts-jest"
        // process `*.tsx` files with `ts-jest`
    },
    collectCoverageFrom: [
        'src/**/*.{js,jsx,ts,tsx}',
    ],
    moduleNameMapper: {
        "^.+\\.svg$": "jest-svg-transformer",
        "\\.(css|less|scss)$": "identity-obj-proxy",
    }
}