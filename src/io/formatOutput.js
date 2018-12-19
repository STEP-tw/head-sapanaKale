const addFilename = function (content, fileName) {
    return "==> " + fileName + " <==" + "\n" + content;
};

const returnContent = function (content, filename) {
    return content;
};

const fileNotFoundMsg = function (utility, filename) {
    return utility + ": " + filename + ": No such file or directory";
};

const isSingleFile = { false: addFilename, true: returnContent };

const formatOutput = function ({ utility, fileData }) {
    let outputView = isSingleFile[fileData.length == 1];
    return fileData.map(function (fileDetails) {
        if (fileDetails.isExists) {
            return outputView(fileDetails.requiredFileContent, fileDetails.name);
        };
        return fileNotFoundMsg(utility, fileDetails.name);
    }).join("\n\n");
};

module.exports = { formatOutput };