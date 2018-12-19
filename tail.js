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
const { validateTailInput } = require('./src/lib/checkErrors.js');
const { formatOutput } = require('./src/io/formatOutput.js');
const { parse } = require('./src/io/parseInput.js');

const fs = require('fs');

const main = function () {
  let parameters = parse(process.argv.slice(2));
  let error = validateTailInput(parameters);
  if (error) {
    return error;
  };
  let output = tail(parameters, fs);
  return formatOutput(output);
};

console.log(main());