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

const isValidOption = function (option) {
  return option == 'n' || option == 'c';
};

const options = { n : "line", c : "byte" };

const segregateInput = function (input) {
  if (isOnlyCount(input[0])) {
    return { option: "n", count: input[0].slice(1), files: input.slice(1) };
  };
  if (isOptionAndCount(input[0])) {
    return {
      option: input[0][1],
      count: input[0].slice(2),
      files: input.slice(1)
    };
  };
  if (isOnlyOption(input[0])) {
    return { option: input[0][1], count: input[1], files: input.slice(2) };
  };
  return { option: "n", count: 10, files: input.slice(0) };
};

const parse = function (input) {
  let parameters = segregateInput(input);
  if (isValidOption(parameters.option)) {
    parameters.option = options[parameters.option];
  };
  if (!isNaN(parameters.count)) {
    parameters.count = +parameters.count;
  };
  return parameters;
};

module.exports = {
  segregateInput,
  parse,
  isOnlyCount,
  isOnlyOption,
  isOptionAndCount,
  isOption,
  isNumber
};