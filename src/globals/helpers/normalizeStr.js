const normalizeStr = function(str, size) { 
    if (str.length > size) {
        return str
                .split(', ')
                .reduce((string, word) => (`${string} ${word},`.length < size) ? `${string} ${word},` : `${string}`, '')
                .slice(1, -1) + '…';
    } else return str;
};

module.exports = normalizeStr;