const errorMessage = 'head: illegal option -- ';

const usageMessage = 'usage: head [-n lines | -c bytes] [file ...]';

const invalidLineCount = 'head: illegal line count -- ';

const invalidByteCount = 'head: illegal byte count -- ';

const segregateInput = function (listOfInput) {
  let result = { type: 'n', 
                 count: '10', 
                 inputFiles: listOfInput.slice(0) };
  
  if( listOfInput[0].length >= 2 && !isNaN( listOfInput[0]-1 ) ) {
    result.count = listOfInput[0].slice(1);
    result.inputFiles = listOfInput.slice(1);
  }
  if( listOfInput[0].length >= 3 && (listOfInput[0][1]=='n'|| listOfInput[0][1]=='c')) {
    result.type = listOfInput[0][1];
    result.count = listOfInput[0].slice(2);
    result.inputFiles = listOfInput.slice(1);
  }
  if( listOfInput[0].length == 2 && isNaN( listOfInput[0]-1 )) {
    result.type = listOfInput[0][1];
    result.count = listOfInput[1];
    result.inputFiles = listOfInput.slice(2);
  }
return result;
}

const headLines = function (content,countOfLines) {
  let lines = content.toString().split('\n');
  lines = lines.slice(0,countOfLines).join('\n');
  return lines;
}

const headCharacters = function (content,countOfChar) {
  let characters = content.slice(0,countOfChar).toString();
  return characters;
}

const headFiles = function (reader,validater,{type,count,inputFiles}) {
  return inputFiles.map(function(file) {
    let fileName = '==> '+ file + ' <==' + '\n';
    if (!validater(file)) {
      return 'head: '+file+': No such file or directory';
    }
    let content = reader(file);
    let result = headCharacters(content,count);
    if( type == 'n') {
      result = headLines(content,count);
    }
    if (inputFiles.length > 1) {
      return fileName + result;
    }
    return result;
  }).join("\n\n");
}

const head = function (reader,validater,{type,count,inputFiles}) {
  if (type != 'n' && type !='c') {
    return errorMessage + type + '\n' + usageMessage;
  }
  if (isNaN(count - 0) || count < 1) {
    return (type == 'n') ? invalidLineCount + count : invalidByteCount + count;
  }
  return headFiles(reader,validater,{type,count,inputFiles});
}

module.exports = { segregateInput,
                   headLines,
                   headCharacters,
                   headFiles,
                   head };
