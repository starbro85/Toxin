const currencyFormat = function(lang, currency, number) {
    const result = new Intl.NumberFormat(lang, {
        style: 'currency',
        currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    })
    .formatToParts(number)
    .map(({type, value}) => {
        switch (type) {
            case 'literal': return ''; 
            default : return value; 
        } 
    })
    .reduce((string, part) => string + part);

    return result;
}

module.exports = currencyFormat;