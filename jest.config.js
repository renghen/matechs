module.exports = {
  rootDir: './',
  testRegex: '/tests/.*',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['packages/**/src/**/*.ts'],
  setupFiles: ['./jest-setup.ts'],
  verbose: true
}
