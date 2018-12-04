const segregateInput = function (listOfInput) {
  let result = { requirement: 'n', 
                 number: '10', 
                 inputFiles: listOfInput.slice(0) };
  
  if( listOfInput[0].length == 2 && !isNaN( listOfInput[0]-1 ) ) {
    result.number = listOfInput[0][1];
    result.inputFiles = listOfInput.slice(1);
  }
  if( listOfInput[0].length == 3 ) {
    result.requirement = listOfInput[0][1];
    result.number = listOfInput[0][2];
    result.inputFiles = listOfInput.slice(1);
  }
  if( listOfInput[0].length == 2 && !isNaN( listOfInput[1]-1 )) {
    result.requirement = listOfInput[0][1];
    result.number = listOfInput[1];
    result.inputFiles = listOfInput.slice(2);
  }
return result;
}

module.exports = {segregateInput};
