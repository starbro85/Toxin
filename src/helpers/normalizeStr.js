const normalizeStr = function({str, size}) {     
    if (str.length > size) {
        return str.split(', ').reduce((acc, item) => (`${acc} ${item},`.length < size) ? `${acc} ${item},` : `${acc}`, '').slice(1, -1) + '…';
    }
    else {
        return str;
    }
};

export {normalizeStr};