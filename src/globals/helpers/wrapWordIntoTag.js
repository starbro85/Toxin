function wrapWordIntoTag({ str, number, tag, classList}) {
    const splittedStr = str.split(' ');

    const opening = classList ? `<${tag} class="${classList}">` : `<${tag}>`;
    const ending = `</${tag}>`;

    return splittedStr.reduce((result, word, index) => (index + 1 === number) ? `${result} ${opening}${word}${ending}` : `${result} ${word}`, '');
};

module.exports = wrapWordIntoTag;