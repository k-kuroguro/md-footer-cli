/* eslint-disable no-throw-literal */
import { join } from 'path';

jest.mock('fs');

const runCommand = (...args: string[]) => {
   process.argv = [
      'node',
      'index.js',
      ...args
   ];

   return import('../bin/index');
};

const normalize = (text: string): string => text.replace(/\r\n/g, '\n');

describe('Command Test', () => {
   let originalArgv: string[] = [];
   let fs: any;

   const [inputs, expectedOutputs] = (() => {
      jest.unmock('fs');

      const inputs: string[] = [];
      const expectedOutputs: string[] = [];
      const testFileDir = join(__dirname, 'test.md');
      const fs = require('fs');

      let index = 0;
      while (true) {
         try {
            inputs.push(fs.readFileSync(join(testFileDir, `test${index}.in`)).toString());
            expectedOutputs.push(fs.readFileSync(join(testFileDir, `test${index}.out`)).toString());
            index++;
         } catch {
            break;
         }
      }

      jest.doMock('fs');

      return [inputs, expectedOutputs];
   })();

   beforeEach(() => {
      jest.resetModules();
      originalArgv = process.argv;
      fs = require('fs');
      fs.readFileSync.mockReturnValue('body');
   });

   afterEach(() => {
      jest.resetAllMocks();
      process.argv = originalArgv;
   });

   for (let i = 0; i < inputs.length; i++) {
      it(`Generation test${i}`, async () => {
         fs.readFileSync.mockReturnValue(inputs[i]);
         await runCommand('input.md');
         expect(normalize(fs.writeFileSync.mock.lastCall[1])).toStrictEqual(normalize(expectedOutputs[i]));
      });
   }

   it('Write to input', async () => {
      await runCommand('input.md');
      expect(fs.writeFileSync).toHaveBeenCalledWith('input.md', 'body');
   });

   it('Write to output', async () => {
      await runCommand('input.md', 'output.md');
      expect(fs.writeFileSync).toHaveBeenCalledWith('output.md', 'body');
   });

   (() => {
      const spyConsoleLog = jest.spyOn(console, 'log');

      const errorCases = [
         { name: 'ENOENT', error: { code: 'ENOENT' }, expectedMessage: 'Reason: input.md is not found.' },
         { name: 'EISDIR', error: { code: 'EISDIR' }, expectedMessage: 'Reason: input.md is directory.' },
         { name: 'EPERM', error: { code: 'EPERM' }, expectedMessage: 'Reason: No permission for access to input.md.' },
         { name: 'EACCESS', error: { code: 'EACCESS' }, expectedMessage: 'Reason: No permission for access to input.md.' },
         { name: 'error without message', error: { code: 'Code' }, expectedMessage: 'Reason: Code.' },
         { name: 'error without code', error: { message: 'Message' }, expectedMessage: 'Reason: Message.' },
         { name: 'error without details', error: {}, expectedMessage: 'Reason: Error occurred.' }
      ];

      for (const errorCase of errorCases) {
         it(`Read error - ${errorCase.name}`, async () => {
            fs.readFileSync.mockImplementationOnce(() => { throw errorCase.error; });
            await runCommand('input.md');
            expect(spyConsoleLog).toHaveBeenLastCalledWith(errorCase.expectedMessage);
            expect(fs.writeFileSync).toBeCalledTimes(0);
         });
      }
      for (const errorCase of errorCases) {
         it(`Write error - ${errorCase.name}`, async () => {
            fs.writeFileSync.mockImplementationOnce(() => { throw errorCase.error; });
            await runCommand('input.md');
            expect(spyConsoleLog).toHaveBeenLastCalledWith(errorCase.expectedMessage);
         });
      }
   })();
});
