const assert = require("assert");

const {
    isType,
    isCount,
    isOnlyNumber,
    isOnlyType,
    isNumberAndType,
    segregateInput
} = require("../../src/lib/parseInput.js");

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