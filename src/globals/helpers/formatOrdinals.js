const formatOrdinals = function (lang, suffixes, number) {
    const rule = new Intl.PluralRules(lang, {
        type: 'ordinal'
    }).select(number);

    return `${number}${suffixes[rule]}`;
}

module.exports = formatOrdinals;