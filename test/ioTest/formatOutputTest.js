const assert = require("assert");

const {
    formatOutput
} = require("../../src/io/formatOutput.js");

describe("formatOutput", function () {
    it("should return file content without heading for single file", function () {
        let actualOutput = formatOutput({
            utility: "head", fileData: [{
                name: "numbers1To5.txt",
                isExists: true,
                requiredFileContent: "1\n2\n3"
            }]
        });
        let expectedOutput = "1\n2\n3";
        assert.deepEqual(actualOutput, expectedOutput);
    });

    it("should return file contents with heading for multiple files", function () {
        let actualOutput = formatOutput({
            utility: "tail", fileData: [{
                name: "numbers1To5.txt",
                isExists: true,
                requiredFileContent: "1\n2"
            },
            {
                name: "vowels.txt",
                isExists: true,
                requiredFileContent: "a\ne"
            }]
        });
        let expectedOutput = "==> numbers1To5.txt <==\n1\n2\n\n==> vowels.txt <==\na\ne";
        assert.deepEqual(actualOutput, expectedOutput);
    });

    it("should return error message if provided file not exists", function () {
        let actualOutput = formatOutput({
            utility: "head", fileData: [{
                name: "numbers.txt",
                isExists: false,
            }]
        });
        let expectedOutput = "head: numbers.txt: No such file or directory";
        assert.deepEqual(actualOutput, expectedOutput);
    });

    it("should return file contents with heading for multiple files and error msg when file not exists", function () {
        let actualOutput = formatOutput({
            utility: "tail", fileData: [{
                name: "numbers1To5.txt",
                isExists: true,
                requiredFileContent: "1\n2"
            },
            {
                name: "vowel.txt",
                isExists: false,
            }]
        });
        let expectedOutput = "==> numbers1To5.txt <==\n1\n2\n\ntail: vowel.txt: No such file or directory";
        assert.deepEqual(actualOutput, expectedOutput);
    });

});