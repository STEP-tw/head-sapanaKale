const illegalOptionMsg = function (option, functionName) {
    return functionName + ": illegal option -- " + option;
};

const illegalCountMsg = function (count, option) {
    return "head: illegal " + option + " count -- " + count;
};

const illegalOffsetMsg = function (count) {
    return "tail: illegal offset -- " + count;
};

const fileNotFoundMsg = function (functionName, fileName) {
    return functionName + ": " + fileName + ": No such file or directory";
};

const isInvalidOption = function (option) {
    return option != "line" && option != "byte";
};

const isInvalidCount = function (count, functionName) {
    if (functionName == 'tail') {
        return isNaN(count) || count < 0;
    }
    return isNaN(count) || count < 1;
};

const usageMsgForHead = "usage: head [-n lines | -c bytes] [file ...]";

const usageMsgForTail = "usage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]";

const usageMsg = { head : usageMsgForHead,
                   tail : usageMsgForTail };

const invalidCountMsg = { head : illegalCountMsg,
                          tail : illegalOffsetMsg };                           

const validateInput = function ({ option, count }, functionName) {
    if (isInvalidOption(option)) {
        return illegalOptionMsg(option, functionName) + "\n" + usageMsg[functionName];
    }
    if (isInvalidCount(count, functionName)) {
        return invalidCountMsg[functionName](count, option);
    }
    return "";
};

module.exports = { validateInput, fileNotFoundMsg, isInvalidCount, isInvalidOption }