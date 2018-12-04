const assert = require('assert');
const { segregateInput } = require('../src/lib.js');

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


