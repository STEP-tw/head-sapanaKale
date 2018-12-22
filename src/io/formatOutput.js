const addFileName = function (filecontent, fileName) {
    return "==> " + fileName + " <==" + "\n" + filecontent;
};

const fileNotFoundMsg = function (utility, filename) {
    return utility + ": " + filename + ": No such file or directory";
};

const formatOutput = function ({ utility, filesData }) {
    return filesData.map(function ({ fileName, isExists, requiredFileContent }) {
        if (!isExists) {
            return fileNotFoundMsg(utility, fileName);
        }
        if (filesData.length == 1) {
            return requiredFileContent;
        };
        return addFileName(requiredFileContent, fileName);
    }).join("\n\n");
};

module.exports = { formatOutput };