/* 
  Usage:
  node ./tail.js file1
  node ./tail.js -n5 file1
  node ./tail.js -n 5 file1
  node ./tail.js -5 file1
  node ./tail.js file1 file2
  node ./tail.js -n 5 file1 file2
  node ./tail.js -n5 file1 file2
  node ./tail.js -5 file1 file2 
  node ./tail.js -c5 file1
  node ./tail.js -c 5 file1
  node ./tail.js -c5 file1 file2
  node ./tail.js -c 5 file1 file2
*/

const { tail } = require('./src/lib/fetchContent.js');
const { formatOutput } = require('./src/lib/formatOutput.js');
const { segregateInput } = require('./src/lib/parseInput.js');

const fs = require('fs');

const main = function () {
  let parameters = segregateInput(process.argv.slice(2));
  let output = tail(parameters, fs);
  console.log(formatOutput(output));
};

main();