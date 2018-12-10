const assert = require("assert");
const {
  segregateInput,
  headLines,
  headCharacters,
  tailCharacters,
  tailLines,
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

const reader = file => file;

const validater = function(file) {
  if (file == "not exists") {
    return false;
  }
  return true;
};

const fs = { readFileSync: reader, existsSync: validater };

describe("isType", function() {
  it("should return true if provided string is in type format", function() {
    assert.deepEqual(isType("-n"), true);
    assert.deepEqual(isType("-c"), true);
    assert.deepEqual(isType("-e"), true);
  });
  it("should return false if provided string is not in type format", function() {
    assert.deepEqual(isType("fh"), false);
  });
});

describe("isCount", function() {
  it("should return true if provided string is number", function() {
    assert.deepEqual(isCount("-12"), true);
    assert.deepEqual(isCount("12"), true);
  });
  it("should return false if provided string is not a number", function() {
    assert.deepEqual(isCount("45h"), false);
    assert.deepEqual(isCount("-4hd"), false);
  });
});

describe("isOnlyNumber", function() {
  it('should return true if provided input is in format "-number"', function() {
    assert.deepEqual(isOnlyNumber("-12"), true);
  });
  it('should return false if provided input is not in format "-number"', function() {
    assert.deepEqual(isOnlyNumber("-n2"), false);
  });
});

describe("isNumberAndType", function() {
  it('should return true if provided input is in format "-n12"', function() {
    assert.deepEqual(isNumberAndType("-n11"), true);
    assert.deepEqual(isNumberAndType("-c4"), true);
  });
  it('should return false if provided input is not in format "-n12"', function() {
    assert.deepEqual(isNumberAndType("-12"), false);
    assert.deepEqual(isNumberAndType("-n"), false);
  });
});

describe("isOnlyType", function() {
  it('should return true if provided input is in format "-n"', function() {
    assert.deepEqual(isOnlyType("-n"), true);
    assert.deepEqual(isOnlyType("-c"), true);
  });
  it('should return false if provided input is not in format "-n"', function() {
    assert.deepEqual(isOnlyType("-n2"), false);
    assert.deepEqual(isOnlyType("-12"), false);
  });
});

describe("isInvalidType", function() {
  it("should return false if provided type is one of n and c", function() {
    assert.deepEqual(isInvalidType("n"), false);
    assert.deepEqual(isInvalidType("c"), false);
  });
  it("should return true if provided type is not n nor c", function() {
    assert.deepEqual(isInvalidType("e"), true);
    assert.deepEqual(isInvalidType("nc"), true);
  });
});

describe("isInvalidCount", function() {
  it("should return false if provided count is positive integer", function() {
    assert.deepEqual(isInvalidCount("12"), false);
    assert.deepEqual(isInvalidCount("2"), false);
  });
  it("should return true if provided count is not a positive integer", function() {
    assert.deepEqual(isInvalidCount("e12"), true);
    assert.deepEqual(isInvalidCount("0"), true);
  });
});

describe("segregateInput", function() {
  it("should return parameter object when line/byte and count is provided combine", function() {
    let actualInput = segregateInput(["-n5", "file1"]);
    let expectedOutput = { type: "n", count: "5", files: ["file1"] };
    assert.deepEqual(actualInput, expectedOutput);
  });

  it("should return parameter object when only count is provide", function() {
    let actualInput = segregateInput(["-5", "file1"]);
    let expectedOutput = { type: "n", count: "5", files: ["file1"] };
    assert.deepEqual(actualInput, expectedOutput);
  });

  it("should return parameter object when line/byte and count is provided separately", function() {
    let actualInput = segregateInput(["-c", "3", "file1", "file2"]);
    let expectedOutput = { type: "c", count: "3", files: ["file1", "file2"] };
    assert.deepEqual(actualInput, expectedOutput);
  });

  it("should return parameter object when only inputs files are provided", function() {
    let actualInput = segregateInput(["file1", "file2"]);
    let expectedOutput = { type: "n", count: "10", files: ["file1", "file2"] };
    assert.deepEqual(actualInput, expectedOutput);
  });
});

describe("headLines", function() {
  it("should return lines from provided input file of given count", function() {
    let file1 = "one\ntwo\nthree\nfour";
    let expectedOutput = "one\ntwo";
    assert.deepEqual(headLines(reader(file1), 2), expectedOutput);
  });
});

describe("headCharacters", function() {
  it("should return characters from provided input file of given count ", function() {
    let file = "one\ntwo";
    let expectedOutput = "one";
    assert.deepEqual(headCharacters(reader(file), 3), expectedOutput);
  });
});

describe("headFile", function() {
  it("should return the lines as per provided input", function() {
    let file = "1\n2\n3";
    assert.deepEqual(
      headFile(fs, "n", 3, addFilename, file),
      "==> 1\n2\n3 <==\n1\n2\n3"
    );
  });

  it("should return the characters as per provided input", function() {
    let file = "one\ntwo\nthree\nfour";
    assert.deepEqual(headFile(fs, "c", 2, returnResult, file), "on");
  });

  it("should return the lines for file which exists and error for file which doesn't exists", function() {
    let file = "not exists";
    let expectedOutput = "head: not exists: No such file or directory";
    assert.deepEqual(headFile(fs, "n", 2, addFilename, file), expectedOutput);
  });
});

describe("head", function() {
  it("should return error message when invalid type is provided ", function() {
    let file = "one\ntwo";
    let file1 = "three\nfour";
    let parameters = { type: "e", count: "2", files: [file, file1] };
    let expectedOutput =
      "head: illegal option -- e\nusage: head [-n lines | -c bytes] [file ...]";
    assert.deepEqual(head(fs, parameters), expectedOutput);
  });

  it("should return the lines when multiple files are provided", function() {
    let file = "one\ntwo\nthree";
    let file1 = "the\na\nan";
    let parameters = { type: "n", count: "2", files: [file, file1] };
    let expectedOutput =
      "==> one\ntwo\nthree <==\none\ntwo\n\n==> the\na\nan <==\nthe\na";
    assert.deepEqual(head(fs, parameters), expectedOutput);
  });

  it("should return error message when provided file does not exists", function() {
    let file = "not exists";
    let file1 = "three\nfour";
    let parameters = { type: "n", count: "2", files: [file, file1] };
    let expectedOutput =
      "head: not exists: No such file or directory\n\n==> three\nfour <==\nthree\nfour";
    assert.deepEqual(head(fs, parameters), expectedOutput);
  });

  it("should return error message when provided count is 0", function() {
    let file = "one\ntwo";
    let file1 = "three\nfour";
    let parameters = { type: "c", count: "0", files: [file, file1] };
    let expectedOutput = "head: illegal byte count -- 0";
    assert.deepEqual(head(fs, parameters), expectedOutput);
  });

  it("should return error message when invalid count is provided", function() {
    let file = "one\ntwo";
    let file1 = "three\nfour";
    let parameters = { type: "n", count: "10x", files: [file, file1] };
    let expectedOutput = "head: illegal line count -- 10x";
    assert.deepEqual(head(fs, parameters), expectedOutput);
  });
});

describe("tailLines", function() {
  it("should return endlines from provided input file of given count", function() {
    let file1 = "one\ntwo\nthree\nfour";
    let expectedOutput = "three\nfour";
    assert.deepEqual(tailLines(reader(file1), 2), expectedOutput);
  });
});

describe("tailCharacters", function() {
  it("should return endcharacters from provided input file of given count ", function() {
    let file = "one\ntwo";
    let expectedOutput = "two";
    assert.deepEqual(tailCharacters(reader(file), 3), expectedOutput);
  });
});

describe("tailFile", function() {
  it("should return the lines as per provided input", function() {
    let file = "1\n2\n3";
    assert.deepEqual(
      tailFile(fs, "n", 2, addFilename, file),
      "==> 1\n2\n3 <==\n2\n3"
    );
  });

  it("should return the characters as per provided input", function() {
    let file = "1\n2\n3";
    assert.deepEqual(tailFile(fs, "c", 2, returnResult, file), "\n3");
  });

  it("should return the lines for file which exists and error for file which doesn't exists", function() {
    let file = "not exists";
    let expectedOutput = "tail: not exists: No such file or directory";
    assert.deepEqual(tailFile(fs, "n", 2, addFilename, file), expectedOutput);
  });
});

describe("tail", function() {
  it("should return error message when invalid type is provided ", function() {
    let file = "one\ntwo";
    let file1 = "three\nfour";
    let parameters = { type: "e", count: "2", files: [file, file1] };
    let expectedOutput =
      "tail: illegal option -- e\nusage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]";
    assert.deepEqual(tail(fs, parameters), expectedOutput);
  });

  it("should return the lines when multiple files are provided", function() {
    let file = "one\ntwo\nthree";
    let file1 = "the\na\nan";
    let parameters = { type: "n", count: "2", files: [file, file1] };
    let expectedOutput =
      "==> one\ntwo\nthree <==\ntwo\nthree\n\n==> the\na\nan <==\na\nan";
    assert.deepEqual(tail(fs, parameters), expectedOutput);
  });

  it("should return error message when provided file does not exists", function() {
    let file = "not exists";
    let file1 = "three\nfour";
    let parameters = { type: "n", count: "2", files: [file, file1] };
    let expectedOutput =
      "tail: not exists: No such file or directory\n\n==> three\nfour <==\nthree\nfour";
    assert.deepEqual(tail(fs, parameters), expectedOutput);
  });

  it("should return error message when provided count is 0", function() {
    let file = "one\ntwo";
    let file1 = "three\nfour";
    let parameters = { type: "c", count: "0", files: [file, file1] };
    let expectedOutput = "tail: illegal byte count -- 0";
    assert.deepEqual(tail(fs, parameters), expectedOutput);
  });

  it("should return error message when invalid count is provided", function() {
    let file = "one\ntwo";
    let file1 = "three\nfour";
    let parameters = { type: "n", count: "10x", files: [file, file1] };
    let expectedOutput = "tail: illegal line count -- 10x";
    assert.deepEqual(tail(fs, parameters), expectedOutput);
  });
});