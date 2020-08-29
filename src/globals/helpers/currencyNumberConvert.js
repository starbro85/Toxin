const currencyNumberConvert = function(str) {
    const result =  Number(str.replace(/[^0-9.-]+/g,""));

    return result;
}

module.exports = currencyNumberConvert;