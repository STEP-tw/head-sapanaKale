const assert = require("assert");

const {
    isOption,
    isNumber,
    isOnlyCount,
    isOnlyOption,
    isOptionAndCount,
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

describe("parse", function () {
    it("should return parameter object when line/byte and count is provided combine", function () {
        let actualInput = parse(["-n5", "file1"]);
        let expectedOutput = { option: "line", count: "5", files: ["file1"] };
        assert.deepEqual(actualInput, expectedOutput);
    });

    it("should return parameter object with option as n when only count is provide", function () {
        let actualInput = parse(["-5", "file1"]);
        let expectedOutput = { option: "line", count: "5", files: ["file1"] };
        assert.deepEqual(actualInput, expectedOutput);
    });

    it("should return parameter object when line/byte and count is provided separately", function () {
        let actualInput = parse(["-c", "3", "file1", "file2"]);
        let expectedOutput = { option: "byte", count: 3, files: ["file1", "file2"] };
        assert.deepEqual(actualInput, expectedOutput);
    });
    
    it("should return object with default option-n and count-10 when only inputs files are provided", function () {
        let actualInput = parse(["file1", "file2"]);
        let expectedOutput = { option: "line", count: 10, files: ["file1", "file2"] };
        assert.deepEqual(actualInput, expectedOutput);
    });

    it("should return parameter object with option undefined when invalid option is given", function () {
        let actualInput = parse(["-e", "3", "file1", "file2"]);
        let expectedOutput = { option: undefined, count: 3, files: ["file1", "file2"] };
        assert.deepEqual(actualInput, expectedOutput);
    });

    it("should return parameter object with count NaN when given count is not a number", function () {
        let actualInput = parse(["-n", "10x", "file1", "file2"]);
        let expectedOutput = { option: "line", count: NaN, files: ["file1", "file2"] };
        assert.deepEqual(isNaN(actualInput.count), isNaN(expectedOutput.count));
    });
});