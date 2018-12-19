const addFilename = function (content, fileName) {
    return "==> " + fileName + " <==" + "\n" + content;
};

const returnContent = function (content, filename) {
    return content;
};

const isSingleFile = { false: addFilename, true: returnContent };

const formatOutput = function (fileContents) {
    let outputView = isSingleFile[fileContents.length == 1];
    return fileContents.map(function (fileContent) {
        if (fileContent.isExists) {
            return outputView(fileContent.textToReturn, fileContent.name);
        };
        return fileContent.textToReturn;
    }).join("\n\n");
};

module.exports = { formatOutput };