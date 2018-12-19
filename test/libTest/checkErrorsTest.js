const assert = require("assert");

const {
    isInvalidOption,
    isInvalidCount,
    validateHeadInput,
    validateTailInput,
} = require("../../src/lib/checkErrors.js");

describe("isInvalidOption", function () {
    it("should return false if provided option is one of n and c", function () {
        assert.deepEqual(isInvalidOption('line'), false);
        assert.deepEqual(isInvalidOption('byte'), false);
    });
    it("should return true if provided option is not n nor c", function () {
        assert.deepEqual(isInvalidOption("e"), true);
        assert.deepEqual(isInvalidOption("nc"), true);
    });
});

describe("isInvalidCount", function () {
    it("should return false if provided count is positive integer and context is head", function () {
        assert.deepEqual(isInvalidCount(12,"head"), false);
    });
    it("should return false if provided count is positive integer and context is tail", function() {
        assert.deepEqual(isInvalidCount(2,"tail"), false);
    });
    it("should return true if provided count is not a positive integer and context is head", function () {
        assert.deepEqual(isInvalidCount("e12","head"), true);
        assert.deepEqual(isInvalidCount(-3,"head"), true);
    });
    it("should return true if provided count is not a positive integer and context is tail", function () {
        assert.deepEqual(isInvalidCount("e12","tail"), true);
        assert.deepEqual(isInvalidCount(-3,"tail"), true);
    });
    it("should return true if provided count is 0 and context is head", function () {
        assert.deepEqual(isInvalidCount(0,"head"), true);
    });
    it("should return false if provided count is 0 and context is tail", function () {
        assert.deepEqual(isInvalidCount(0,"tail"), false);
    });
});

describe("validateHeadInput", function () {
    it("should return nothing when provided option and count is valid", function () {
        assert.deepEqual(validateHeadInput({ option : 'line', count : 1 }), '');
        assert.deepEqual(validateHeadInput({ option : 'byte', count : 2 }), '');
    });

    it("should return invalid count error when given count is 0", function () {
        let actualOutput = validateHeadInput({ option : 'line', count : 0 });
        let expectedOutput = "head: illegal line count -- 0";
        assert.deepEqual(actualOutput, expectedOutput);
    });
    
    it("should return invalid count error when count is not +ve number", function () {
        let actualOutput = validateHeadInput({ option : 'line', count : -1 });
        let expectedOutput = "head: illegal line count -- -1";
        assert.deepEqual(actualOutput, expectedOutput);

        actualOutput = validateHeadInput({ option : 'byte', count : "c2" });
        expectedOutput = "head: illegal byte count -- c2";
        assert.deepEqual(actualOutput, expectedOutput);
    });

    it("should return invalid option error when given option not n or c", function () {
        let actualOutput = validateHeadInput({ option : 'e', count : 1 });
        let expectedOutput = "head: illegal option -- e\n";
            expectedOutput += "usage: head [-n lines | -c bytes] [file ...]";
        assert.deepEqual(actualOutput, expectedOutput);

        actualOutput = validateHeadInput({ option : '-', count : 2 });
        expectedOutput = "head: illegal option -- -\n";
        expectedOutput += "usage: head [-n lines | -c bytes] [file ...]";
        assert.deepEqual(actualOutput, expectedOutput);
    });  
});

describe("validateTailInput", function () {
    it("should return nothing when provided option and count is valid", function () {
        assert.deepEqual(validateTailInput({ option : 'line', count : 1 }), '');
        assert.deepEqual(validateTailInput({ option : 'byte', count : 2 }), '');
    });

    it("should return invalid count error when count is not +ve number", function () {
        let actualOutput = validateTailInput({ option: 'line', count: -1 });
        let expectedOutput = "tail: illegal offset -- -1";
        assert.deepEqual(actualOutput, expectedOutput);

        actualOutput = validateTailInput({ option: 'byte', count: "c2" });
        expectedOutput = "tail: illegal offset -- c2";
        assert.deepEqual(actualOutput, expectedOutput);
    });

    it("should return nothing when given count is 0 and context is tail", function () {
        assert.deepEqual(validateTailInput({ option : 'line', count : 0 }), '');   
        assert.deepEqual(validateTailInput({ option : 'byte', count : 0 }), '');   
    });

    it("should return invalid option error when given option not n or c", function () {
        let actualOutput = validateTailInput({ option: 'd', count: 2 });
        let expectedOutput = "tail: illegal option -- d\n";
        expectedOutput += "usage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]";
        assert.deepEqual(actualOutput, expectedOutput);

        actualOutput = validateTailInput({ option: '2', count: 1 });
        expectedOutput = "tail: illegal option -- 2\n";
        expectedOutput += "usage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]";
        assert.deepEqual(actualOutput, expectedOutput);
    });
});