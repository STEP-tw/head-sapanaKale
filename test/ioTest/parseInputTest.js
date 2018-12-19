const assert = require("assert");

const {
    isOption,
    isNumber,
    isOnlyCount,
    isOnlyOption,
    isOptionAndCount,
    segregateInput,
    parse,
} = require("../../src/io/parseInput.js");

describe("isOption", function () {
    it("should return true if provided string is in option format", function () {
        assert.deepEqual(isOption("-n"), true);
        assert.deepEqual(isOption("-c"), true);
        assert.deepEqual(isOption("-e"), true);
    });
    it("should return false if provided string is not in option format", function () {
        assert.deepEqual(isOption("fh"), false);
    });
});

describe("isNumber", function () {
    it("should return true if provided string is number", function () {
        assert.deepEqual(isNumber("-12"), true);
        assert.deepEqual(isNumber("12"), true);
    });
    it("should return false if provided string is not a number", function () {
        assert.deepEqual(isNumber("45h"), false);
        assert.deepEqual(isNumber("-4hd"), false);
    });
});

describe("isOnlyCount", function () {
    it('should return true if provided input is in format "-number"', function () {
        assert.deepEqual(isOnlyCount("-12"), true);
    });
    it('should return false if provided input is not in format "-number"', function () {
        assert.deepEqual(isOnlyCount("-n2"), false);
    });
});

describe("isOptionAnd", function () {
    it('should return true if provided input is in format "-n12"', function () {
        assert.deepEqual(isOptionAndCount("-n11"), true);
        assert.deepEqual(isOptionAndCount("-c4"), true);
    });
    it('should return false if provided input is not in format "-n12"', function () {
        assert.deepEqual(isOptionAndCount("-12"), false);
        assert.deepEqual(isOptionAndCount("-n"), false);
    });
});

describe("isOnlyOption", function () {
    it('should return true if provided input is in format "-n"', function () {
        assert.deepEqual(isOnlyOption("-n"), true);
        assert.deepEqual(isOnlyOption("-c"), true);
    });
    it('should return false if provided input is not in format "-n"', function () {
        assert.deepEqual(isOnlyOption("-n2"), false);
        assert.deepEqual(isOnlyOption("-12"), false);
    });
});

describe("segregateInput", function () {
    it("should return parameter object when line/byte and count is provided combine", function () {
        let actualOutput = segregateInput(["-n5", "file1"]);
        let expectedOutput = { option: "n", count: "5", files: ["file1"] };
        assert.deepEqual(actualOutput, expectedOutput);
    });

    it("should return parameter object with option as n when only count is provide", function () {
        let actualOutput = segregateInput(["-5", "file1"]);
        let expectedOutput = { option: "n", count: "5", files: ["file1"] };
        assert.deepEqual(actualOutput, expectedOutput);
    });

    it("should return parameter object when line/byte and count is provided separately", function () {
        let actualOutput = segregateInput(["-c", "3", "file1", "file2"]);
        let expectedOutput = { option: "c", count: "3", files: ["file1", "file2"] };
        assert.deepEqual(actualOutput, expectedOutput);
    });
    
    it("should return object with default option-n and count-10 when only inputs files are provided", function () {
        let actualOutput = segregateInput(["file1", "file2"]);
        let expectedOutput = { option: "n", count: "10", files: ["file1", "file2"] };
        assert.deepEqual(actualOutput, expectedOutput);
    });
});

describe("parse", function () {
    it("should return parameter object with option as line when option is n", function () {
        let actualOutput = parse(["-n5", "file1"]);
        let expectedOutput = { option: "line", count: 5, files: ["file1"] };
        assert.deepEqual(actualOutput, expectedOutput);
    });

    it("should return parameter object with count converted to number when count is not NaN", function () {
        let actualOutput = parse(["-c", "3", "file1", "file2"]);
        let expectedOutput = { option: "byte", count: 3, files: ["file1", "file2"] };
        assert.deepEqual(actualOutput, expectedOutput);
    });
    
    it("should return parameter object with given option when provided option is invalid", function () {
        let actualOutput = parse(["-e", "3", "file1", "file2"]);
        let expectedOutput = { option: "e", count: 3, files: ["file1", "file2"] };
        assert.deepEqual(actualOutput, expectedOutput);
    });

    it("should return parameter object with given count in string if provided count is NaN", function () {
        let actualOutput = parse(["-n", "10x", "file1", "file2"]);
        let expectedOutput = { option: "line", count: "10x", files: ["file1", "file2"] };
        assert.deepEqual(actualOutput, expectedOutput);
    });
});
