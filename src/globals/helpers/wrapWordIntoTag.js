function wrapWordIntoTag(str, number, tag) {
    const splittedStr = str.split(' ');

    return splittedStr.reduce((result, word, index) => (index + 1 === number) ? `${result} <${tag}>${word}</${tag}>` : `${result} ${word}`, '');
};

module.exports = wrapWordIntoTag;