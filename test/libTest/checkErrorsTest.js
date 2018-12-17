const assert = require("assert");

const {
    isInvalidOption,
    isInvalidCount,
    validateInput
} = require("../../src/lib/checkErrors.js");

describe("isInvalidOption", function () {
    it("should return false if provided option is one of n and c", function () {
        assert.deepEqual(isInvalidOption("n"), false);
        assert.deepEqual(isInvalidOption("c"), false);
    });
    it("should return true if provided option is not n nor c", function () {
        assert.deepEqual(isInvalidOption("e"), true);
        assert.deepEqual(isInvalidOption("nc"), true);
    });
});

describe("isInvalidCount", function () {
    it("should return false if provided count is positive integer and context is head", function () {
        assert.deepEqual(isInvalidCount("12","head"), false);
    });
    it("should return false if provided count is positive integer and context is tail", function() {
        assert.deepEqual(isInvalidCount("2","tail"), false);
    });
    it("should return true if provided count is not a positive integer and context is head", function () {
        assert.deepEqual(isInvalidCount("e12","head"), true);
        assert.deepEqual(isInvalidCount("-3","head"), true);
    });
    it("should return true if provided count is not a positive integer and context is tail", function () {
        assert.deepEqual(isInvalidCount("e12","tail"), true);
        assert.deepEqual(isInvalidCount("-3","tail"), true);
    });
    it("should return true if provided count is 0 and context is head", function () {
        assert.deepEqual(isInvalidCount("0","head"), true);
    });
    it("should return false if provided count is 0 and context is tail", function () {
        assert.deepEqual(isInvalidCount("0","tail"), false);
    });
});

describe("validateInput", function () {
    it("should return nothing when provided option and count is valid for given context", function () {
        assert.deepEqual(validateInput({ option : 'n', count : 1 }, "head"), '');
        assert.deepEqual(validateInput({ option : 'n', count : 1 }, "tail"), '');
        assert.deepEqual(validateInput({ option : 'c', count : 2 }, "head"), '');
        assert.deepEqual(validateInput({ option : 'c', count : 2 }, "tail"), '');
    });
    
    it("should return nothing when given count is 0 and context is tail", function () {
        assert.deepEqual(validateInput({ option : 'n', count : 0 }, "tail"), '');   
        assert.deepEqual(validateInput({ option : 'c', count : 0 }, "tail"), '');   
    });

    it("should return invalid count error when given count is 0 and context is head", function () {
        let actualOutput = validateInput({ option : 'n', count : 0 }, "head");
        let expectedOutput = "head: illegal line count -- 0";
        assert.deepEqual(actualOutput, expectedOutput);
    });
    
    it("should return invalid count error when count is not +ve number and context is head", function () {
        let actualOutput = validateInput({ option : 'n', count : -1 }, "head");
        let expectedOutput = "head: illegal line count -- -1";
        assert.deepEqual(actualOutput, expectedOutput);

        actualOutput = validateInput({ option : 'c', count : "c2" }, "head");
        expectedOutput = "head: illegal byte count -- c2";
        assert.deepEqual(actualOutput, expectedOutput);
    });

    it("should return invalid count error when count is not +ve number and context is tail", function () {
        let actualOutput = validateInput({ option : 'n', count : -1 }, "tail");
        let expectedOutput = "tail: illegal offset -- -1";
        assert.deepEqual(actualOutput, expectedOutput);

        actualOutput = validateInput({ option : 'c', count : "c2" }, "tail");
        expectedOutput = "tail: illegal offset -- c2";
        assert.deepEqual(actualOutput, expectedOutput);
    });

    it("should return invalid option error when given option not n or c and context is head", function () {
        let actualOutput = validateInput({ option : 'e', count : 1 }, "head");
        let expectedOutput = "head: illegal option -- e\n";
            expectedOutput += "usage: head [-n lines | -c bytes] [file ...]";
        assert.deepEqual(actualOutput, expectedOutput);

        actualOutput = validateInput({ option : '-', count : 2 }, "head");
        expectedOutput = "head: illegal option -- -\n";
        expectedOutput += "usage: head [-n lines | -c bytes] [file ...]";
        assert.deepEqual(actualOutput, expectedOutput);
    });

    it("should return invalid option error when given option not n or c and context is tail", function () {
        let actualOutput = validateInput({ option : 'd', count : 2 }, "tail");
        let expectedOutput = "tail: illegal option -- d\n";
            expectedOutput += "usage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]";
        assert.deepEqual(actualOutput, expectedOutput);

        actualOutput = validateInput({ option : '2', count : 1 }, "tail");
        expectedOutput = "tail: illegal option -- 2\n";
        expectedOutput += "usage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]";
        assert.deepEqual(actualOutput, expectedOutput);
    });
});