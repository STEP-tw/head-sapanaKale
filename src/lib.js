const illegalOptionMsg = function (option, functionName) {
  return functionName + ": illegal option -- " + option;
};

const usageMsgForHead = "usage: head [-n lines | -c bytes] [file ...]";

const usageMsgForTail = "usage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]";

const illegalLineCountMsg = function (count, functionName) {
  return functionName + ": illegal line count -- " + count;
};

const illegalByteCountMsg = function (count, functionName) {
  return functionName + ": illegal byte count -- " + count;
};

const fileNotFoundMsg = function (fileName, functionName) {
  return functionName + ": " + fileName + ": No such file or directory";
};

const addFilename = function (fileName, content) {
  return "==> " + fileName + " <==" + "\n" + content;
};

const returnResult = function (file, result) {
  return result;
};

const isCount = function (string) {
  return !isNaN(string);
};

const isType = function (string) {
  return string[0] == "-" && isNaN(string[1]);
};

const isOnlyNumber = function (input) {
  return input.length > 1 && isCount(input.slice(0, 2));
};

const isNumberAndType = function (input) {
  return input.length > 2 && isType(input);
};

const isOnlyType = function (input) {
  return input.length == 2 && isType(input);
};

const segregateInput = function (input) {
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

const isInvalidType = function (type) {
  return type != "n" && type != "c";
};

const isInvalidCount = function (count,functionName) {
  if ( functionName == 'tail') {
    return isNaN(count);
  }
  return isNaN(count) || count < 1;
};

const illegalCountMsg = { n: illegalLineCountMsg, c: illegalByteCountMsg };

const illegalOffsetMsg = "tail: illegal offset -- ";

const usageMsg = { head: usageMsgForHead, tail: usageMsgForTail };

const validateInput = function ({ type, count }, functionName) {
  if (isInvalidType(type)) {
    return illegalOptionMsg(type, functionName) + "\n" + usageMsg[functionName];
  }
  if (isInvalidCount(count, functionName)) {
    if (functionName == 'tail') {
      return illegalOffsetMsg + count;
    }
    return illegalCountMsg[type](count, functionName);
  }
};

const headLines = function (content, countOfLines) {
  let lines = content.toString().split("\n");
  lines = lines.slice(0, countOfLines).join("\n");
  return lines;
};

const headCharacters = function (content, countOfChar) {
  let characters = content.slice(0, countOfChar).toString();
  return characters;
};

const headContent = { n: headLines, c: headCharacters };

const isSingleFile = { false: addFilename, true: returnResult };

const headFile = function (fs, type, count, reporter, file) {
  if (!fs.existsSync(file)) {
    return fileNotFoundMsg(file, "head");
  }
  let content = fs.readFileSync(file);
  let result = headContent[type](content, count);
  return reporter(file, result);
};

const head = function (fs, { type, count, files }) {
  let error = validateInput({ type, count }, "head");
  if (error) {
    return error;
  }
  let reporter = isSingleFile[files.length === 1];
  let mapper = headFile.bind(null, fs, type, count, reporter);
  return files.map(mapper).join("\n\n");
};

const tailLines = function (content, count) {
  let lines = content.toString().split("\n");
  lines = lines.slice(lines.length - count).join("\n");
  return lines;
};

const tailCharacters = function (content, count) {
  let characters = content.slice(content.length - count).toString();
  return characters;
};

const tailContent = { n: tailLines, c: tailCharacters };

const tailFile = function (fs, type, count, reporter, file) {
  if (!fs.existsSync(file)) {
    return fileNotFoundMsg(file, "tail");
  }
  let content = fs.readFileSync(file);
  let result = tailContent[type](content, count);
  return reporter(file, result);
};

const tail = function (fs, { type, count, files }) {
  let error = validateInput({ type, count }, "tail");
  if (error) {
    return error;
  }
  let reporter = isSingleFile[files.length === 1];
  let mapper = tailFile.bind(null, fs, type, count, reporter);
  return files.map(mapper).join("\n\n");
};

module.exports = {
  segregateInput,
  headLines,
  headCharacters,
  tailLines,
  tailCharacters,
  headFile,
  head,
  tailFile,
  tail,
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
