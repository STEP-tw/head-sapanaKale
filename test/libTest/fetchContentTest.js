const assert = require("assert");

const {
  take,
  last,
  headLines,
  headBytes,
  tailLines,
  tailBytes,
  head,
  tail,
} = require("../../src/lib/fetchContent.js");

const {
  fileNotFoundMsg
} = require("../../src/lib/checkErrors.js");

const fileContents = {
  "numbers1To5.txt": "1\n2\n3\n4\n5",
  "vowels.txt": "a\ne\ni\no\nu",
  "numbers1to12": "1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12"
};

const reader = file => fileContents[file];

const validater = function (file) {
  if (fileContents[file] == undefined) {
    return false;
  }
  return true;
};

const fs = { readFileSync: reader, existsSync: validater };

describe("take", function () {
  it("should return top element for given list of given count", function () {
    assert.deepEqual(take(2, [1,2,3,4]), [1,2]);
  });

  it("should return empty list for given list with count 0", function () {
    assert.deepEqual(take(0, [1,2,3,4]), []);
  });
});

describe("last", function () {
  it("should return bottom element for given list of given count", function () {
    assert.deepEqual(last(2, [1, 2, 3, 4]), [3, 4]);
  });

  it("should return whole list for given list with count equal to list length", function () {
    assert.deepEqual(last(4, [1, 2, 3, 4]), [1, 2, 3, 4]);
  });
});

describe("headLines", function () {
  it("should return the toplines as per provided count", function () {
    let numbers = "1\n2\n3";
    assert.deepEqual(headLines(2, numbers), "1\n2");
  });
});

describe("headBytes", function () {
  it("should return the topbytes as per provided count", function () {
    let numbers = "1\n2\n3";
    assert.deepEqual(headBytes(2, numbers), "1\n");
  });
});

describe("tailLines", function () {
  it("should return the endlines as per provided count", function () {
    let numbers = "1\n2\n3";
    assert.deepEqual(tailLines(2, numbers), "2\n3");
  });
});

describe("tailBytes", function () {
  it("should return the endbytes as per provided count", function () {
    let numbers = "1\n2\n3";
    assert.deepEqual(tailBytes(2, numbers), "\n3");
  });
});

describe("head", function () {
  describe("should return list of object contains file details as per provided parameters", function () {
    it("should return isExists as true if provided file is present", function () {
      let parameters = { option: "n", count: "3", files: ["numbers1To5.txt"] }
      let actualOutput = head(parameters, fs);
      let expectedOutput = [{
        name: "numbers1To5.txt",
        isExists: true,
        textToReturn: "1\n2\n3"
      }];
      assert.deepEqual(actualOutput, expectedOutput);
    });

    it("should return isExists as false and fileText as undefined if file not exists", function () {
      let parameters = { option: "n", count: "3", files: ["numbers.txt"] }
      let actualOutput = head(parameters, fs);
      let expectedOutput = [{
        name: "numbers.txt",
        isExists: false,
        textToReturn: "head: numbers.txt: No such file or directory",
      }];
      assert.deepEqual(actualOutput, expectedOutput);
    });

    it("should return file details for multiple files", function () {
      let parameters = { option: "c", count: "3", files: ["numbers1To5.txt", "vowels.txt"] }
      let actualOutput = head(parameters, fs);
      let expectedOutput = [{
        name: "numbers1To5.txt",
        isExists: true,
        textToReturn: "1\n2"
      },
      {
        name: "vowels.txt",
        isExists: true,
        textToReturn: "a\ne"
      }];
      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
});

describe("tail", function () {
  describe("should return list of object contains file details as per provided parameters", function () {
    it("should return isExists as true if provided file is present", function () {
      let parameters = { option: "n", count: "3", files: ["numbers1To5.txt"] }
      let actualOutput = tail(parameters, fs);
      let expectedOutput = [{
        name: "numbers1To5.txt",
        isExists: true,
        textToReturn: "3\n4\n5"
      }];
      assert.deepEqual(actualOutput, expectedOutput);
    });

    it("should return isExists as false and fileText as undefined if file not exists", function () {
      let parameters = { option: "n", count: "3", files: ["numbers.txt"] }
      let actualOutput = tail(parameters, fs);
      let expectedOutput = [{
        name: "numbers.txt",
        isExists: false,
        textToReturn: "tail: numbers.txt: No such file or directory",
      }];
      assert.deepEqual(actualOutput, expectedOutput);
    });

    it("should return file details for multiple files", function () {
      let parameters = { option: "c", count: "3", files: ["numbers1To5.txt", "vowels.txt"] }
      let actualOutput = tail(parameters, fs);
      let expectedOutput = [{
        name: "numbers1To5.txt",
        isExists: true,
        textToReturn: "4\n5"
      },
      {
        name: "vowels.txt",
        isExists: true,
        textToReturn: "o\nu"
      }];
      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
});