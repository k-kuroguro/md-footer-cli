import { parseSync } from 'yargs';

type Yargs = {
   locale: jest.Mock<Yargs, any>,
   usage: jest.Mock<Yargs, any>,
   example: jest.Mock<Yargs, any>,
   demandCommand: jest.Mock<Yargs, any>,
   help: jest.Mock<Yargs, any>,
   alias: jest.Mock<Yargs, any>,
   epilog: jest.Mock<Yargs, any>,
   argv: {
      [x: string]: unknown;
      _: (string | number)[];
      $0: string;
   } | Promise<{
      [x: string]: unknown;
      _: (string | number)[];
      $0: string;
   }>
};

const yargs: Yargs = {
   locale: jest.fn(() => yargs),
   usage: jest.fn(() => yargs),
   example: jest.fn(() => yargs),
   demandCommand: jest.fn(() => yargs),
   help: jest.fn(() => yargs),
   alias: jest.fn(() => yargs),
   epilog: jest.fn(() => yargs),
   argv: parseSync()
};

module.exports = yargs;
