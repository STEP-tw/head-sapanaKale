const assert = require('assert');
const { segregateInput,
        headLines,
        headCharacters,
        headFiles,
        head } = require('../src/lib.js');

describe('segregateInput', function() {
  it('should return parameter object when line/byte and count is provided combine', function() {
    let actualInput = segregateInput(['-n5','file1']); 
    let expectedOutput = {type:'n',count:'5',files:['file1']};
    assert.deepEqual(actualInput,expectedOutput);
  });

  it('should return parameter object when only count is provide', function() {
    let actualInput = segregateInput(['-5','file1']); 
    let expectedOutput = {type:'n',count:'5',files:['file1']};
    assert.deepEqual(actualInput,expectedOutput);
  });

  it('should return parameter object when line/byte and count is provided separately', function() {
    let actualInput = segregateInput(['-c','3','file1','file2']); 
    let expectedOutput = {type:'c',count:'3',files:['file1','file2']};
    assert.deepEqual(actualInput,expectedOutput);
  });

  it('should return parameter object when only inputs files are provided', function() {
    let actualInput = segregateInput(['file1','file2']); 
    let expectedOutput = {type:'n',count:'10',files:['file1','file2']};
    assert.deepEqual(actualInput,expectedOutput);
  });
});

const reader = file => file;

describe('headLines', function() {
  it('should return lines from provided input file of given count', function() {
    let file1 = 'one\ntwo\nthree\nfour';
    let expectedOutput = 'one\ntwo';
    assert.deepEqual(headLines(reader(file1),2),expectedOutput);
  });
});

describe('headCharacters', function() {
  it('should return characters from provided input file of given count ', function() {
    let file = 'one\ntwo';
    let expectedOutput = 'one';
    assert.deepEqual(headCharacters(reader(file),3),expectedOutput);
  });
});

const validater = function(file) {
  if(file == 'not exists') {
    return false;
  }
  return true;
}

describe('headFiles', function() {
  it('should return the lines as per provided input', function() {
    let file = 'one\ntwo\nthree\nfour';
    let parameters = {type:'n',count:'3',files:[file]}
    assert.deepEqual(headFiles(reader,validater,parameters),'one\ntwo\nthree');
  });

  it('should return the characters as per provided input', function() {
    let file = 'one\ntwo\nthree\nfour';
    let parameters = {type:'c',count:'2',files: [file]}
    assert.deepEqual(headFiles(reader,validater,parameters),'on');
  });

  it('should return the lines when multiple files are provided', function() {
    let file = 'one\ntwo\nthree';
    let file1 = 'the\na\nan';
    let parameters = {type:'n',count:'2',files:[file,file1]}
    let expectedOutput = '==> one\ntwo\nthree <==\none\ntwo\n\n==> the\na\nan <==\nthe\na'
    assert.deepEqual(headFiles(reader,validater,parameters),expectedOutput);
  });

  it('should return the characters when multiple files are provided', function() {
    let file = 'one\ntwo';
    let file1 = 'three\nfour';
    let parameters = {type:'c',count:'2',files: [file,file1]}
    let expectedOutput = '==> one\ntwo <==\non\n\n==> three\nfour <==\nth'
    assert.deepEqual(headFiles(reader,validater,parameters),expectedOutput);
  });

  it("should return the lines for file which exists and error for file which doesn't exists", function() {
    let file = 'one\ntwo\nthree';
    let file1 = 'not exists';
    let parameters = {type:'n',count:'2',files:[file,file1]}
    let expectedOutput = '==> one\ntwo\nthree <==\none\ntwo\n\nhead: not exists: No such file or directory'
    assert.deepEqual(headFiles(reader,validater,parameters),expectedOutput);
  });
});

describe('head', function() {
  it('should return error message when invalid type is provided ', function() {
    let file = 'one\ntwo';
    let file1 = 'three\nfour';
    let parameters = {type:'e',count:'2',files: [file,file1]}
    let expectedOutput = 'head: illegal option -- e\nusage: head [-n lines | -c bytes] [file ...]';
    assert.deepEqual(head(reader,validater,parameters),expectedOutput);
  });

  it('should return the lines when multiple files are provided', function() {
    let file = 'one\ntwo\nthree';
    let file1 = 'the\na\nan';
    let parameters = {type:'n',count:'2',files:[file,file1]}
    let expectedOutput = '==> one\ntwo\nthree <==\none\ntwo\n\n==> the\na\nan <==\nthe\na'
    assert.deepEqual(head(reader,validater,parameters),expectedOutput);
  });

  it('should return error message when provided does not exists', function() {
    let file = 'not exists';
    let file1 = 'three\nfour';
    let parameters = {type:'n',count:'2',files: [file,file1]}
    let expectedOutput = 'head: not exists: No such file or directory\n\n==> three\nfour <==\nthree\nfour'
    assert.deepEqual(head(reader,validater,parameters),expectedOutput);
  });

  it('should return error message when provided count is 0', function() {
    let file = 'one\ntwo';
    let file1 = 'three\nfour';
    let parameters = {type:'c',count:'0',files: [file,file1]}
    let expectedOutput = 'head: illegal byte count -- 0';
    assert.deepEqual(head(reader,validater,parameters),expectedOutput);
  });

  it('should return error message when invalid count is provided', function() {
    let file = 'one\ntwo';
    let file1 = 'three\nfour';
    let parameters = {type:'n',count:'10x',files: [file,file1]}
    let expectedOutput = 'head: illegal line count -- 10x';
    assert.deepEqual(head(reader,validater,parameters),expectedOutput);
  });
});
