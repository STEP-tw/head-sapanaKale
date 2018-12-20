const addFileName = function (filecontent, fileName) {
    return "==> " + fileName + " <==" + "\n" + filecontent;
};

const fileNotFoundMsg = function (utility, filename) {
    return utility + ": " + filename + ": No such file or directory";
};

const formatOutput = function ({ utility, fileData }) {
    return fileData.map(function ({ fileName, isExists, requiredFileContent }) {
        if (isExists) {
            if (fileData.length == 1) {
                return requiredFileContent;
            };
            return addFileName(requiredFileContent, fileName);
        };
        return fileNotFoundMsg(utility, fileName);
    }).join("\n\n");
};

module.exports = { formatOutput };