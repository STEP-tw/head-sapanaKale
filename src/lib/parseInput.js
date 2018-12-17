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

module.exports = { segregateInput, isOnlyNumber, isOnlyType, isNumberAndType, isType, isCount };