const illegalOptionMsg = 'head: illegal option -- ';

const usageMsg = 'usage: head [-n lines | -c bytes] [file ...]';

const illegalLineCountMsg = 'head: illegal line count -- ';

const illegalByteCountMsg = 'head: illegal byte count -- ';

const isCount = function (string) {
  return !isNaN(string);
}

const isType = function (string) {
  return string[0] == '-' && isNaN(string[1]);
}

/*
 * default = file1 file2;
 * syntax1 = -12 file1 file2;
 * syntax2 = -n12 file1 file2;
 * syntax3 = -n 12 file1 file2;
 */

const isSyntax1 = function (input) {
  return input.length > 1 && isCount(input.slice(0,2));
}

const isSyntax2 = function (input) {
  return input.length > 2 && isType(input);
}

const isSyntax3 = function (input) {
  return input.length == 2 && isType(input);
}

const segregateInput = function (input) {
  if (isSyntax1(input[0])) {
    return {type:'n', count: input[0].slice(1), files: input.slice(1)}
  }
  if (isSyntax2(input[0])) {
    return {type: input[0][1], count: input[0].slice(2), files: input.slice(1) }
  }
  if (isSyntax3(input[0])) {
    return {type: input[0][1], count: input[1], files: input.slice(2) }
  }
  return { type: 'n', count: '10',files: input.slice(0) };
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

const headFiles = function (reader,validater,{type,count,files}) {
  return files.map(function(file) {
    let fileName = '==> '+ file + ' <==' + '\n';
    if (!validater(file)) {
      return 'head: '+file+': No such file or directory';
    }
    let content = reader(file);
    let result = headCharacters(content,count);
    if( type == 'n') {
      result = headLines(content,count);
    }
    if (files.length > 1) {
      return fileName + result;
    }
    return result;
  }).join("\n\n");
}

const head = function (reader,validater,{type,count,files}) {
  if (type != 'n' && type !='c') {
    return illegalOptionMsg + type + '\n' + usageMsg;
  }
  if (isNaN(count - 0) || count < 1) {
    return (type == 'n') ? illegalLineCountMsg + count : illegalByteCountMsg + count;
  }
  return headFiles(reader,validater,{type,count,files});
}

module.exports = { segregateInput,
                   headLines,
                   headCharacters,
                   headFiles,
                   head };
