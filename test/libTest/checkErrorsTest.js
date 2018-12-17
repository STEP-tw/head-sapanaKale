const assert = require("assert");

const {
    isInvalidOption,
    isInvalidCount
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
    it("should return false if provided count is positive integer", function () {
        assert.deepEqual(isInvalidCount("12"), false);
        assert.deepEqual(isInvalidCount("2"), false);
    });
    it("should return true if provided count is not a positive integer", function () {
        assert.deepEqual(isInvalidCount("e12"), true);
        assert.deepEqual(isInvalidCount("0"), true);
    });
});