const pluralize = function (lang, plural, number) {
    const rule = new Intl.PluralRules(lang).select(number);
    const result = plural[rule]

    return result;
};

module.exports = pluralize;