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
const { validateHeadInput } = require('./src/lib/checkErrors.js');
const { formatOutput } = require('./src/io/formatOutput.js');
const { parse } = require('./src/io/parseInput.js');

const fs = require('fs');

const main = function () {
  let parameters = parse(process.argv.slice(2));
  let error = validateHeadInput(parameters);
  if (error) {
    return error;
  };
  let output = head(parameters, fs);
  return formatOutput(output);
};

console.log(main());