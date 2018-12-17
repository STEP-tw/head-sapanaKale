const assert = require("assert");

const {
    isOption,
    isCount,
    isOnlyNumber,
    isOnlyOption,
    isNumberAndOption,
    segregateInput
} = require("../../src/lib/parseInput.js");

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

describe("isNumberAndOption", function () {
    it('should return true if provided input is in format "-n12"', function () {
        assert.deepEqual(isNumberAndOption("-n11"), true);
        assert.deepEqual(isNumberAndOption("-c4"), true);
    });
    it('should return false if provided input is not in format "-n12"', function () {
        assert.deepEqual(isNumberAndOption("-12"), false);
        assert.deepEqual(isNumberAndOption("-n"), false);
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
        let actualInput = segregateInput(["-n5", "file1"]);
        let expectedOutput = { option: "n", count: "5", files: ["file1"] };
        assert.deepEqual(actualInput, expectedOutput);
    });

    it("should return parameter object when only count is provide", function () {
        let actualInput = segregateInput(["-5", "file1"]);
        let expectedOutput = { option: "n", count: "5", files: ["file1"] };
        assert.deepEqual(actualInput, expectedOutput);
    });

    it("should return parameter object when line/byte and count is provided separately", function () {
        let actualInput = segregateInput(["-c", "3", "file1", "file2"]);
        let expectedOutput = { option: "c", count: "3", files: ["file1", "file2"] };
        assert.deepEqual(actualInput, expectedOutput);
    });

    it("should return parameter object when only inputs files are provided", function () {
        let actualInput = segregateInput(["file1", "file2"]);
        let expectedOutput = { option: "n", count: "10", files: ["file1", "file2"] };
        assert.deepEqual(actualInput, expectedOutput);
    });
});