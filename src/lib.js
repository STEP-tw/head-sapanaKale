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

const headLines = function (reader,numberOfLines,file) {
  let content = reader(file);
  let lines = content.toString().split('\n');
  lines = lines.slice(0,numberOfLines).join('\n');
  return lines;
}

const headCharacters = function (reader,numberOfChar,file) {
  let content = reader(file);
  let characters = content.slice(0,numberOfChar).toString();
  return characters;
}

const head = function (reader, {requirement,number,inputFiles}) {
  return inputFiles.map(function(file) {
    let fileName = '==> '+ file + ' <==' + '\n';
    let result;
    if( requirement == 'n') {
      result = headLines(reader,number,file);
    } else {
      result = headCharacters(reader,number,file);
    }
    if (inputFiles.length > 1) {
      return fileName + result;
    }
    return result;
  }).join("\n");
}

module.exports = { segregateInput,
                   headLines,
                   headCharacters,
                   head };
