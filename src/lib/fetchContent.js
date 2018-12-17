const { segregateInput } = require("./parseInput.js")

const { validateInput, fileNotFoundMsg } = require("./checkErrors.js")

const delimiter = {n : '\n', c : ""};

const fetchContent = function (content, count, delimiter, context) {
  let result = content.toString().split(delimiter);
  if (context == "head") {
  return result.slice(0,count).join(delimiter);
  };
  return result.slice(Math.max(result.length-count,0)).join(delimiter);
};

const addFilename = function (fileName, content) {
  return "==> " + fileName + " <==" + "\n" + content;
};

const returnResult = function (file, result) {
  return result;
};

const isSingleFile = { false: addFilename, true: returnResult };

const headFile = function (fs, option, count, reporter, file) {
  if (!fs.existsSync(file)) {
    return fileNotFoundMsg(file, "head");
  }
  let content = fs.readFileSync(file);
  let result = fetchContent(content, count, delimiter[option], "head");
  return reporter(file, result);
};

const head = function ({ option, count, files }, fs) {
  let error = validateInput({ option, count }, "head");
  if (error) {
    return error;
  }
  let reporter = isSingleFile[files.length === 1];
  let mapper = headFile.bind(null, fs, option, count, reporter);
  return files.map(mapper).join("\n\n");
};


const tailFile = function (fs, option, count, reporter, file) {
  if (!fs.existsSync(file)) {
    return fileNotFoundMsg(file, "tail");
  }
  let content = fs.readFileSync(file);
  let result = fetchContent(content, count, delimiter[option], "tail");
  return reporter(file, result);
};

const tail = function ({ option, count, files }, fs) {
  let error = validateInput({ option, count }, "tail");
  if (error) {
    return error;
  }
  let reporter = isSingleFile[files.length === 1];
  let mapper = tailFile.bind(null, fs, option, count, reporter);
  return files.map(mapper).join("\n\n");
};

module.exports = {
  fetchContent,
  headFile,
  head,
  tailFile,
  tail,
  addFilename,
  returnResult,
};