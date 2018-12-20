const isNumber = function (userArg) {
  return !isNaN(userArg);
};

const isStartWithOption = function (userArg) {
  return userArg[0] == "-" && isNaN(userArg[1]);
};

const isOnlyCount = function (userArg) {
  return userArg.length > 1 && isNumber(userArg.slice(0, 2));
};

const isOptionAndCount = function (userArg) {
  return userArg.length > 2 && isStartWithOption(userArg);
};

const isOnlyOption = function (userArg) {
  return userArg.length == 2 && isStartWithOption(userArg);
};

const isValidOption = function (option) {
  return option == 'n' || option == 'c';
};

const options = { n : "line", c : "byte" };

const createParameterObject = function (option, count, files) {
  return { option, count, files };
};

const segregateInput = function (userArgs) {
  let firstArg = userArgs[0];
  let option = "n";
  let count = 10;
  let files = userArgs.slice(0);
  if (isOnlyCount(firstArg)) {
    count = firstArg.slice(1);
    files = userArgs.slice(1);
  };
  if (isOptionAndCount(firstArg)) {
    option = firstArg[1];
    count = firstArg.slice(2);
    files = userArgs.slice(1);
  };
  if (isOnlyOption(firstArg)) {
    option = firstArg[1];
    count = userArgs[1];
    files = userArgs.slice(2);
  };
  return createParameterObject(option, count, files)
};

const parse = function (userArgs) {
  let parameters = segregateInput(userArgs);
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
  isStartWithOption,
  isNumber
};