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

const headLines = function (content,numberOfLines) {
  let lines = content.toString().split('\n');
  lines = lines.slice(0,numberOfLines).join('\n');
  return lines;
}

const headCharacters = function (content,numberOfChar) {
  let characters = content.slice(0,numberOfChar).toString();
  return characters;
}

const headFiles = function (reader,validater,{requirement,number,inputFiles}) {
  return inputFiles.map(function(file) {
    let fileName = '==> '+ file + ' <==' + '\n';
    if (!validater(file)) {
      return 'head: '+file+': No such file or directory';
    }
    let content = reader(file);
    let result = headCharacters(content,number);
    if( requirement == 'n') {
      result = headLines(content,number);
    }
    if (inputFiles.length > 1) {
      return fileName + result;
    }
    return result;
  }).join("\n\n");
}

const errorMessage = 'head: illegal option -- ';

const usageMessage = 'usage: head [-n lines | -c bytes] [file ...]';

const head = function (reader,validater,{requirement,number,inputFiles}) {
  if (requirement != 'n' && requirement !='c') {
    return errorMessage + requirement + '\n' + usageMessage;
  }
  if (number < 1) {
    return (requirement == 'n') ? 'head: illegal line count -- 0' :'head: illegal byte count -- 0';
  }
  return headFiles(reader,validater,{requirement,number,inputFiles});
}

module.exports = { segregateInput,
                   headLines,
                   headCharacters,
                   headFiles,
                   head };
