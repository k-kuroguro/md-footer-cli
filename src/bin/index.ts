#!/usr/bin/env node

import * as yargs from 'yargs';
import { readFileSync, writeFileSync } from 'fs';
import { generateLinks } from 'md-footer';

const handleError = (error: any, path: string) => {
   switch (error.code) {
      case 'ENOENT':
         console.log(`Reason: ${path} is not found.`);
         break;
      case 'EISDIR':
         console.log(`Reason: ${path} is directory.`);
         break;
      case 'EPERM':
      case 'EACCESS':
         console.log(`Reason: No permission for access to ${path}.`);
         break;
      default:
         if (error.message) console.log(`Reason: ${error.message}.`);
         else if (error.code) console.log(`Reason: ${error.code}.`);
         else console.log('Reason: Error occurred.');
         break;
   }
};

(async () => {
   const argv = await yargs
      .locale('en')
      .usage('$0 generates markdown footer links.')
      .example('$0 input.md', 'generate footer links in input.md')
      .example('$0 input.md output.md', 'generate footer links of input.md to output.md')
      .demandCommand(1)
      .help('h')
      .alias('h', 'help')
      .alias('v', 'version')
      .epilog('Copyright 2022 Riku Kanayama (k_kuroguro) All Rights Reserved.')
      .argv;

   const inputMdPath = argv._[0].toString();
   const outputMdPath = (argv._[1] as string | number | undefined)?.toString();

   const inputMd = (() => {
      try {
         return readFileSync(inputMdPath);
      } catch (e) {
         handleError(e, inputMdPath.toString());
      }
   })()?.toString();
   if (!inputMd) return;

   const generatedText = generateLinks(inputMd);

   try {
      if (outputMdPath) {
         writeFileSync(outputMdPath, generatedText);
      } else {
         writeFileSync(inputMdPath, generatedText);
      }
   } catch (e) {
      handleError(e, outputMdPath?.toString() ?? inputMdPath.toString());
   }
})();
