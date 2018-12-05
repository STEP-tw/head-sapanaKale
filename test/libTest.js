const assert = require('assert');
const { segregateInput,
        headLines,
        headCharacters,
        headFiles,
        head } = require('../src/lib.js');

describe('segregateInput', function() {
  it('should return object parameter as key with values for provided input', function() {
    let actualInput = segregateInput(['-n5','file1']); 
    let expectedOutput = {requirement:'n',number:'5',inputFiles:['file1']};
    assert.deepEqual(actualInput,expectedOutput);

    actualInput = segregateInput(['-5','file1']); 
    expectedOutput = {requirement:'n',number:'5',inputFiles:['file1']};
    assert.deepEqual(actualInput,expectedOutput);

    actualInput = segregateInput(['-c','3','file1','file2']); 
    expectedOutput = {requirement:'c',number:'3',inputFiles:['file1','file2']};
    assert.deepEqual(actualInput,expectedOutput);

    actualInput = segregateInput(['file1','file2']); 
    expectedOutput = {requirement:'n',number:'10',inputFiles:['file1','file2']};
    assert.deepEqual(actualInput,expectedOutput);
  });
});

const reader = file => file;

describe('headLines', function() {
  it('should return lines from provided input file of given number', function() {
    let file1 = 'one\ntwo\nthree\nfour';
    let expectedOutput = 'one\ntwo';
    assert.deepEqual(headLines(reader,2,file1),expectedOutput);
  });
});

describe('headCharacters', function() {
  it('should return characters from provided input file of given number ', function() {
    let file = 'one\ntwo';
    let expectedOutput = 'one';
    assert.deepEqual(headCharacters(reader,3,file),expectedOutput);
  });
});

describe('headFiles', function() {
  it('should return the lines as per provided input', function() {
    let file = 'one\ntwo\nthree\nfour';
    let parameters = {requirement:'n',number:'3',inputFiles:[file]}
    assert.deepEqual(headFiles(reader,parameters),'one\ntwo\nthree');
  });

  it('should return the characters as per provided input', function() {
    let file2 = 'one\ntwo\nthree\nfour';
    let parameters = {requirement:'c',number:'2',inputFiles: [file2]}
    assert.deepEqual(headFiles(reader,parameters),'on');
  });

  it('should return the lines when multiple files are provided', function() {
    let file = 'one\ntwo\nthree';
    let file1 = 'the\na\nan';
    let parameters = {requirement:'n',number:'2',inputFiles:[file,file1]}
    let expectedOutput = '==> one\ntwo\nthree <==\none\ntwo\n\n==> the\na\nan <==\nthe\na'
    assert.deepEqual(headFiles(reader,parameters),expectedOutput);
  });

  it('should return the characters when multiple files are provided', function() {
    let file = 'one\ntwo';
    let file1 = 'three\nfour';
    let parameters = {requirement:'c',number:'2',inputFiles: [file,file1]}
    let expectedOutput = '==> one\ntwo <==\non\n\n==> three\nfour <==\nth'
    assert.deepEqual(headFiles(reader,parameters),expectedOutput);
  });
});

describe('head', function() {
  it('should return error message when invalid inputs are provided ', function() {
    let file = 'one\ntwo';
    let file1 = 'three\nfour';
    let parameters = {requirement:'e',number:'2',inputFiles: [file,file1]}
    let expectedOutput = 'head: illeagal option -- e\nusage: head [-n lines | -c bytes] [file ...]';
    assert.deepEqual(head(reader,parameters),expectedOutput);
  });

  it('should return the lines when multiple files are provided', function() {
    let file = 'one\ntwo\nthree';
    let file1 = 'the\na\nan';
    let parameters = {requirement:'n',number:'2',inputFiles:[file,file1]}
    let expectedOutput = '==> one\ntwo\nthree <==\none\ntwo\n\n==> the\na\nan <==\nthe\na'
    assert.deepEqual(head(reader,parameters),expectedOutput);
  });
});
