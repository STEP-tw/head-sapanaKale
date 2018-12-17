const illegalOptionMsg = function (option, functionName) {
    return functionName + ": illegal option -- " + option;
};

const illegalLineCountMsg = function (count, functionName) {
    return functionName + ": illegal line count -- " + count;
};

const illegalByteCountMsg = function (count, functionName) {
    return functionName + ": illegal byte count -- " + count;
};

const fileNotFoundMsg = function (fileName, functionName) {
    return functionName + ": " + fileName + ": No such file or directory";
};
const isInvalidOption = function (option) {
    return option != "n" && option != "c";
};

const isInvalidCount = function (count, functionName) {
    if (functionName == 'tail') {
        return isNaN(count);
    }
    return isNaN(count) || count < 1;
};

const illegalCountMsg = { n: illegalLineCountMsg, c: illegalByteCountMsg };

const illegalOffsetMsg = "tail: illegal offset -- ";

const usageMsgForHead = "usage: head [-n lines | -c bytes] [file ...]";

const usageMsgForTail = "usage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]";

const usageMsg = { head: usageMsgForHead, tail: usageMsgForTail };

const validateInput = function ({ option, count }, functionName) {
    if (isInvalidOption(option)) {
        return illegalOptionMsg(option, functionName) + "\n" + usageMsg[functionName];
    }
    if (isInvalidCount(count, functionName)) {
        if (functionName == 'tail') {
            return illegalOffsetMsg + count;
        }
        return illegalCountMsg[option](count, functionName);
    }
};

module.exports = { validateInput, fileNotFoundMsg, isInvalidCount, isInvalidOption }