const getImagePath = function (src, source) {
    const path = {};

    try {
        path.src = require.context('../../img', true)(src).default;
    } 
    catch(event) {
        path.src = '';
    }

    if (source) {
        path.source = source.map((item) => {
            const source = {};
    
            try {
                source.srcset = require.context('../../img', true)(item.srcset).default;
            }
            catch(event) {
                source.srcset = '';
            }
    
            if (item.srcset) {
                source.media = item.media;
            }
    
            return source;
        });
    }   

    return path; 
}

module.exports = getImagePath;