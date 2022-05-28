import { Config } from '@jest/types';

const config: Config.InitialOptions = {
   preset: 'ts-jest',
   testMatch: ['**/__tests__/**/(*.)+(spec|test).ts?(x)'],
   testEnvironment: 'node',
   collectCoverage: true,
   errorOnDeprecated: true,
};

export default config;
