const assert = require("assert");
const {
  segregateInput,
  fetchContent,
  headFile,
  head,
  tail,
  tailFile,
  validateInput,
  addFilename,
  returnResult,
  isType,
  isCount,
  isOnlyNumber,
  isNumberAndType,
  isOnlyType,
  isInvalidType,
  isInvalidCount
} = require("../src/lib.js");

const fileContents = { "numbers1To5.txt" : "1\n2\n3\n4\n5",
                       "vowels.txt" : "a\ne\ni\no\nu",
                       "numbers1to12" : "1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12" };

const reader = file => fileContents[file];

const validater = function (file) {
  if (fileContents[file] == undefined) {
    return false;
  }
  return true;
};

const fs = { readFileSync: reader, existsSync: validater };

describe("isType", function () {
  it("should return true if provided string is in type format", function () {
    assert.deepEqual(isType("-n"), true);
    assert.deepEqual(isType("-c"), true);
    assert.deepEqual(isType("-e"), true);
  });
  it("should return false if provided string is not in type format", function () {
    assert.deepEqual(isType("fh"), false);
  });
});

describe("isCount", function () {
  it("should return true if provided string is number", function () {
    assert.deepEqual(isCount("-12"), true);
    assert.deepEqual(isCount("12"), true);
  });
  it("should return false if provided string is not a number", function () {
    assert.deepEqual(isCount("45h"), false);
    assert.deepEqual(isCount("-4hd"), false);
  });
});

describe("isOnlyNumber", function () {
  it('should return true if provided input is in format "-number"', function () {
    assert.deepEqual(isOnlyNumber("-12"), true);
  });
  it('should return false if provided input is not in format "-number"', function () {
    assert.deepEqual(isOnlyNumber("-n2"), false);
  });
});

describe("isNumberAndType", function () {
  it('should return true if provided input is in format "-n12"', function () {
    assert.deepEqual(isNumberAndType("-n11"), true);
    assert.deepEqual(isNumberAndType("-c4"), true);
  });
  it('should return false if provided input is not in format "-n12"', function () {
    assert.deepEqual(isNumberAndType("-12"), false);
    assert.deepEqual(isNumberAndType("-n"), false);
  });
});

describe("isOnlyType", function () {
  it('should return true if provided input is in format "-n"', function () {
    assert.deepEqual(isOnlyType("-n"), true);
    assert.deepEqual(isOnlyType("-c"), true);
  });
  it('should return false if provided input is not in format "-n"', function () {
    assert.deepEqual(isOnlyType("-n2"), false);
    assert.deepEqual(isOnlyType("-12"), false);
  });
});

describe("isInvalidType", function () {
  it("should return false if provided type is one of n and c", function () {
    assert.deepEqual(isInvalidType("n"), false);
    assert.deepEqual(isInvalidType("c"), false);
  });
  it("should return true if provided type is not n nor c", function () {
    assert.deepEqual(isInvalidType("e"), true);
    assert.deepEqual(isInvalidType("nc"), true);
  });
});

describe("isInvalidCount", function () {
  it("should return false if provided count is positive integer", function () {
    assert.deepEqual(isInvalidCount("12"), false);
    assert.deepEqual(isInvalidCount("2"), false);
  });
  it("should return true if provided count is not a positive integer", function () {
    assert.deepEqual(isInvalidCount("e12"), true);
    assert.deepEqual(isInvalidCount("0"), true);
  });
});

describe("segregateInput", function () {
  it("should return parameter object when line/byte and count is provided combine", function () {
    let actualInput = segregateInput(["-n5", "file1"]);
    let expectedOutput = { type: "n", count: "5", files: ["file1"] };
    assert.deepEqual(actualInput, expectedOutput);
  });

  it("should return parameter object when only count is provide", function () {
    let actualInput = segregateInput(["-5", "file1"]);
    let expectedOutput = { type: "n", count: "5", files: ["file1"] };
    assert.deepEqual(actualInput, expectedOutput);
  });

  it("should return parameter object when line/byte and count is provided separately", function () {
    let actualInput = segregateInput(["-c", "3", "file1", "file2"]);
    let expectedOutput = { type: "c", count: "3", files: ["file1", "file2"] };
    assert.deepEqual(actualInput, expectedOutput);
  });

  it("should return parameter object when only inputs files are provided", function () {
    let actualInput = segregateInput(["file1", "file2"]);
    let expectedOutput = { type: "n", count: "10", files: ["file1", "file2"] };
    assert.deepEqual(actualInput, expectedOutput);
  });
});

describe("fetchContent", function () {
  describe("context - head", function () {
    it("should return the toplines as per provided count when delimiter is '\n'", function () {
      let numbers = "1\n2\n3";
      assert.deepEqual(fetchContent(numbers, 2, "\n", "head"), "1\n2");
    });
    it("should return the topbytes as per provided count when delimiter is ''", function () {
      let numbers = "1\n2\n3";
      assert.deepEqual(fetchContent(numbers, 2, "", "head"), "1\n");
    });
  });
  describe("context - tail", function () {
    it("should return the endlines as per provided count when delimiter is '\n'", function () {
      let numbers = "1\n2\n3";
      assert.deepEqual(fetchContent(numbers, 2, "\n", "tail"), "2\n3");
    });
    it("should return the endbytes as per provided count when delimiter is ''", function () {
      let numbers = "1\n2\n3";
      assert.deepEqual(fetchContent(numbers, 2, "", "tail"), "\n3");
    });
  })
});

describe("headFile", function () {
  it("should return the lines as per provided input", function () {
    assert.deepEqual(
      headFile(fs, "n", 3, addFilename, "numbers1To5.txt"),
      "==> numbers1To5.txt <==\n1\n2\n3"
    );
  });

  it("should return the characters as per provided input", function () {
    assert.deepEqual(headFile(fs, "c", 2, returnResult, "vowels.txt"), "a\n");
  });

  it("should return the lines for file which exists and error for file which doesn't exists", function () {
    let expectedOutput = "head: oddNumbers: No such file or directory";
    assert.deepEqual(headFile(fs, "n", 2, addFilename, "oddNumbers"), expectedOutput);
  });
});

describe("head", function () {
  it("should return error message when invalid type is provided ", function () {
    let parameters = { type: "e", count: "2", files: ["numbers1To5.txt", "vowels.txt"] };
    let expectedOutput =
      "head: illegal option -- e\nusage: head [-n lines | -c bytes] [file ...]";
    assert.deepEqual(head(parameters, fs), expectedOutput);
  });

  it("should return the lines when multiple files are provided", function () {
    let parameters = { type: "n", count: "2", files: ["numbers1To5.txt", "vowels.txt"] };
    let expectedOutput =
      "==> numbers1To5.txt <==\n1\n2\n\n==> vowels.txt <==\na\ne";
    assert.deepEqual(head(parameters, fs), expectedOutput);
  });

  it("should return error message when provided file does not exists", function () {
    let file = "not exists";
    let file1 = "three\nfour";
    let parameters = { type: "n", count: "2", files: ["evenNumbers.txt", "numbers1To5.txt"] };
    let expectedOutput =
      "head: evenNumbers.txt: No such file or directory\n\n==> numbers1To5.txt <==\n1\n2";
    assert.deepEqual(head(parameters, fs), expectedOutput);
  });

  it("should return error message when provided count is 0", function () {
    let file = "one\ntwo";
    let file1 = "three\nfour";
    let parameters = { type: "c", count: "0", files: ["numbers1to5.txt", "vowels.txt"] };
    let expectedOutput = "head: illegal byte count -- 0";
    assert.deepEqual(head(parameters, fs), expectedOutput);
  });

  it("should return error message when invalid count is provided", function () {
    let parameters = { type: "n", count: "10x", files: ["numbers1to5.txt", "vowels.txt"] };
    let expectedOutput = "head: illegal line count -- 10x";
    assert.deepEqual(head(parameters, fs), expectedOutput);
  });
  
  describe("tailFile", function () {
    it("should return the endlines as per provided input", function () {
      assert.deepEqual(
        tailFile(fs, "n", 2, addFilename, "numbers1To5.txt"),
        "==> numbers1To5.txt <==\n4\n5"
        );
      });
      
      it("should return the endcharacters as per provided input", function () {
        assert.deepEqual(tailFile(fs, "c", 2, returnResult, "vowels.txt"), "\nu");
      });
      
      it("should return the endlines for file which exists and error for file which doesn't exists", function () {
        let expectedOutput = "tail: numbers.txt: No such file or directory";
        assert.deepEqual(tailFile(fs, "n", 2, addFilename, "numbers.txt"), expectedOutput);
      });
    });
    
    describe("tail", function () {
      it("should return error message when invalid type is provided ", function () {
        let parameters = { type: "e", count: "2", files: ["numbers1To5.txt", "vowels.txt"] };
        let expectedOutput =
        "tail: illegal option -- e\nusage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]";
        assert.deepEqual(tail(parameters, fs), expectedOutput);
      });
    });

  it("should return the endlines when multiple files are provided", function () {
    let parameters = { type: "n", count: "2", files: ["numbers1To5.txt", "vowels.txt"] };
    let expectedOutput =
      "==> numbers1To5.txt <==\n4\n5\n\n==> vowels.txt <==\no\nu";
    assert.deepEqual(tail(parameters, fs), expectedOutput);
  });

  it("should return error message when provided file does not exists", function () {
    let parameters = { type: "n", count: "2", files: ["numbers.txt","vowels.txt" ] };
    let expectedOutput =
      "tail: numbers.txt: No such file or directory\n\n==> vowels.txt <==\no\nu";
    assert.deepEqual(tail(parameters, fs), expectedOutput);
  });

  it("should treat 0 as legal count", function () {
    let parameters = { type: "c", count: "0", files: ["numbers1To5.txt", "vowels.txt"] };
    let expectedOutput = "==> numbers1To5.txt <==\n\n\n==> vowels.txt <==\n";
    assert.deepEqual(tail(parameters, fs), expectedOutput);
  });

  it("should return error message when invalid count is provided", function () {
    let parameters = { type: "n", count: "10x", files: ["numbers1To5.txt", "vowels.txt"] };
    let expectedOutput = "tail: illegal offset -- 10x";
    assert.deepEqual(tail(parameters, fs), expectedOutput);
  });
});