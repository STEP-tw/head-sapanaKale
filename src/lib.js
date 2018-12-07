const illegalOptionMsg = function(option) {
  return "head: illegal option -- " + option;
};

const usageMsg = "usage: head [-n lines | -c bytes] [file ...]";

const illegalLineCountMsg = function(count) {
  return "head: illegal line count -- " + count;
};

const illegalByteCountMsg = function(count) {
  return "head: illegal byte count -- " + count;
};

const fileNotFoundMsg = function(fileName) {
  return "head: " + fileName + ": No such file or directory";
};

const addFilename = function(fileName, content) {
  return "==> " + fileName + " <==" + "\n" + content;
};

const returnResult = function(file, result) {
  return result;
};

const isCount = function(string) {
  return !isNaN(string);
};

const isType = function(string) {
  return string[0] == "-" && isNaN(string[1]);
};

/*
 * default = file1 file2;
 * syntax1 = -12 file1 file2;
 * syntax2 = -n12 file1 file2;
 * syntax3 = -n 12 file1 file2;
 */

const isOnlyNumber = function(input) {
  return input.length > 1 && isCount(input.slice(0, 2));
};

const isNumberAndType = function(input) {
  return input.length > 2 && isType(input);
};

const isOnlyType = function(input) {
  return input.length == 2 && isType(input);
};

const segregateInput = function(input) {
  if (isOnlyNumber(input[0])) {
    return { type: "n", count: input[0].slice(1), files: input.slice(1) };
  }
  if (isNumberAndType(input[0])) {
    return {
      type: input[0][1],
      count: input[0].slice(2),
      files: input.slice(1)
    };
  }
  if (isOnlyType(input[0])) {
    return { type: input[0][1], count: input[1], files: input.slice(2) };
  }
  return { type: "n", count: "10", files: input.slice(0) };
};

const isInvalidType = function(type) {
  return type != "n" && type != "c";
};

const isInvalidCount = function(count) {
  return isNaN(count) || count < 1;
};

const validateInput = function({ type, count }) {
  if (isInvalidType(type)) {
    return illegalOptionMsg(type) + "\n" + usageMsg;
  }
  if (isInvalidCount(count)) {
    return type == "n"
      ? illegalLineCountMsg(count)
      : illegalByteCountMsg(count);
  }
};

const headLines = function(content, countOfLines) {
  let lines = content.toString().split("\n");
  lines = lines.slice(0, countOfLines).join("\n");
  return lines;
};

const headCharacters = function(content, countOfChar) {
  let characters = content.slice(0, countOfChar).toString();
  return characters;
};

const headContent = { n: headLines, c: headCharacters };

const resultType = { false: addFilename, true: returnResult };

const headFile = function(fs, type, count, reporter, file) {
  if (!fs.existsSync(file)) {
    return fileNotFoundMsg(file);
  }
  let content = fs.readFileSync(file);
  let result = headContent[type](content, count);
  return reporter(file, result);
};

const head = function(fs, { type, count, files }) {
  let error = validateInput({ type, count });
  if (error) {
    return error;
  }
  let reporter = resultType[files.length === 1];
  let mapper = headFile.bind(null, fs, type, count, reporter);
  return files.map(mapper).join("\n\n");
};

module.exports = {
  segregateInput,
  headLines,
  headCharacters,
  headFile,
  head,
  validateInput,
  addFilename,
  returnResult,
  isType,
  isCount,
  isOnlyNumber,
  isNumberAndType,
  isOnlyType,
  isInvalidType,
  isInvalidCount
};
