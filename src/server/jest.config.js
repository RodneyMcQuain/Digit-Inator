const { defaults: tsjPreset } = require('ts-jest/presets')

module.exports = {
  preset: '@shelf/jest-mongodb',
  testEnvironment: 'node',
  transform: tsjPreset.transform,
  watchPathIgnorePatterns: ['globalConfig']
};