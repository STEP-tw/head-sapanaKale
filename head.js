/* 
  Usage:
  node ./head.js file1
  node ./head.js -n5 file1
  node ./head.js -n 5 file1
  node ./head.js -5 file1
  node ./head.js file1 file2
  node ./head.js -n 5 file1 file2
  node ./head.js -n5 file1 file2
  node ./head.js -5 file1 file2 
  node ./head.js -c5 file1
  node ./head.js -c 5 file1
  node ./head.js -c5 file1 file2
  node ./head.js -c 5 file1 file2
*/

const { head } = require('./src/lib/fetchContent.js');
const { formatOutput } = require('./src/lib/formatOutput.js');
const { segregateInput } = require('./src/lib/parseInput.js');

const fs = require('fs');

const main = function () {
  let parameters = segregateInput(process.argv.slice(2));
  let output = head(parameters, fs);
  console.log(formatOutput(output));
};

main();

