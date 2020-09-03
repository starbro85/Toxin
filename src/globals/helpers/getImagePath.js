const getImagePath = function (src) {
    let path;

    try {
        path = require.context('../../img', true)(src).default;
    } 
    catch(event) {
        path = '';
    }

    return path; 
}

module.exports = getImagePath;