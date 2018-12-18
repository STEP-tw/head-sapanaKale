const { fileNotFoundMsg, validateInput } = require("./checkErrors.js");

const take = function (count, list) {
  return list.slice(0,count);
};

const last = function (count, list) {
  return list.slice(-count);
};

const fetchContent = function (delimiter, fetcher, count, content) {
  let result = content.toString().split(delimiter);
  result = fetcher( count, result);
  return result.join(delimiter);
};

const headLines = fetchContent.bind(null, "\n", take);

const headBytes = fetchContent.bind(null, "", take);

const tailLines = fetchContent.bind(null, "\n", last);

const tailBytes = fetchContent.bind(null, "", last);

const requiredText = { head : { n : headLines, c : headBytes },
                          tail : { n : tailLines, c : tailBytes }
                        };

const getContents = function (command, { option, count, files }, fs) {
  let error = validateInput({ option, count }, command);
  if (error) {
    return error;
  }
  return files.map(function (filename) {
    let fileContents = {
      name: filename,
      isExists: fs.existsSync(filename),
      textToReturn: fileNotFoundMsg.bind(null, command, filename)()
    };
    if (fileContents.isExists == true) {
      let fileText = fs.readFileSync(filename);
      fileContents.textToReturn = requiredText[command][option].bind(null, count, fileText)();
    };
    return fileContents;
  });
};

const head = getContents.bind(null, "head");

const tail = getContents.bind(null, "tail");

module.exports = {
  take,
  last,
  headLines,
  headBytes,
  tailLines,
  tailBytes,
  head,
  tail,
};