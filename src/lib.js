const segregateInput = function (listOfInput) {
  if( listOfInput[0].length == 2 && !isNaN( listOfInput[0]-1 ) ) {
    return { requirement:'n', 
             number:listOfInput[0][1], 
             inputFiles:listOfInput.slice(1) };
  }
  if( listOfInput[0].length == 3 ) {
    return { requirement: listOfInput[0][1],
             number: listOfInput[0][2],
             inputFiles: listOfInput.slice(1) };
  }
  return { requirement: listOfInput[0][1],
           number: listOfInput[1],
           inputFiles: listOfInput.slice(2) };
}

module.exports = {segregateInput};
