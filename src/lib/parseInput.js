const isNumber = function (string) {
  return !isNaN(string);
};

const isOption = function (string) {
  return string[0] == "-" && isNaN(string[1]);
};

const isOnlyCount = function (input) {
  return input.length > 1 && isNumber(input.slice(0, 2));
};

const isOptionAndCount = function (input) {
  return input.length > 2 && isOption(input);
};

const isOnlyOption = function (input) {
  return input.length == 2 && isOption(input);
};

const addFilename = function (content, fileName) {
  return "==> " + fileName + " <==" + "\n" + content;
};

const returnContent = function (content, filename) {
  return content;
};

const isSingleFile = { false: addFilename, true: returnContent };

const segregateInput = function (input) {
  let parameters = { option: "n", count: "10", files: input.slice(0) };
  if (isOnlyCount(input[0])) {
    parameters = { option: "n", count: input[0].slice(1), files: input.slice(1) };
  }
  if (isOptionAndCount(input[0])) {
    parameters = {
      option: input[0][1],
      count: input[0].slice(2),
      files: input.slice(1)
    };
  }
  if (isOnlyOption(input[0])) {
    parameters = { option: input[0][1], count: input[1], files: input.slice(2) };
  }
  parameters.outputView = isSingleFile[parameters.files.length === 1];
  return parameters;
};

module.exports = { segregateInput, isOnlyCount, isOnlyOption, isOptionAndCount, isOption, isNumber, addFilename, returnContent };