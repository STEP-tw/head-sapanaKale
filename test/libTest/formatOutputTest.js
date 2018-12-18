const assert = require("assert");

const {
    formatOutput
} = require("../../src/lib/formatOutput.js");

describe("formatOutput", function () {
    it("should return file content without heading for single file", function () {
        let actualOutput = formatOutput([{
            name: "numbers1To5.txt",
            isExists: true,
            textToReturn: "1\n2\n3"
        }]);
        let expectedOutput = "1\n2\n3";
        assert.deepEqual(actualOutput, expectedOutput);
    });

    it("should return file contents with heading for multiple files", function () {
        let actualOutput = formatOutput([{
            name: "numbers1To5.txt",
            isExists: true,
            textToReturn: "1\n2"
        },
        {
            name: "vowels.txt",
            isExists: true,
            textToReturn: "a\ne"
        }]);
        let expectedOutput = "==> numbers1To5.txt <==\n1\n2\n\n==> vowels.txt <==\na\ne";
        assert.deepEqual(actualOutput, expectedOutput);
    });

    it("should return error message if provided file not exists", function () {
        let actualOutput = formatOutput([{
            name: "numbers.txt",
            isExists: false,
            textToReturn: "head: numbers.txt: No such file or directory"
        }]);
        let expectedOutput = "head: numbers.txt: No such file or directory";
        assert.deepEqual(actualOutput, expectedOutput);
    });

    it("should return file contents with heading for multiple files and error msg when file not exists", function () {
        let actualOutput = formatOutput([{
            name: "numbers1To5.txt",
            isExists: true,
            textToReturn: "1\n2"
        },
        {
            name: "vowel.txt",
            isExists: false,
            textToReturn: "head: vowel.txt: No such file or directory"
        }]);
        let expectedOutput = "==> numbers1To5.txt <==\n1\n2\n\nhead: vowel.txt: No such file or directory";
        assert.deepEqual(actualOutput, expectedOutput);
    });

});