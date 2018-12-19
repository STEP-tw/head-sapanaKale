const illegalOptionMsg = function (option, utility) {
    return utility + ": illegal option -- " + option;
};

const illegalCountMsg = function (count, option) {
    return "head: illegal " + option + " count -- " + count;
};

const illegalOffsetMsg = function (count) {
    return "tail: illegal offset -- " + count;
};

const isInvalidOption = function (option) {
    return option != "line" && option != "byte";
};

const isInvalidCount = function (count, utility) {
    if (utility == 'tail') {
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

const validateInput = function (utility, { option, count }) {
    if (isInvalidOption(option)) {
        return illegalOptionMsg(option, utility) + "\n" + usageMsg[utility];
    }
    if (isInvalidCount(count, utility)) {
        return invalidCountMsg[utility](count, option);
    }
    return "";
};

const validateHeadInput = validateInput.bind(null, "head");

const validateTailInput = validateInput.bind(null, "tail");

module.exports = {
    isInvalidCount,
    isInvalidOption,
    validateHeadInput,
    validateTailInput
}