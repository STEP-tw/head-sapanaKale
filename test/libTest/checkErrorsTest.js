const assert = require("assert");

const {
    isInvalidType,
    isInvalidCount
} = require("../../src/lib/checkErrors.js");

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