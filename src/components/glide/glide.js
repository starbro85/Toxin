import './glide.css';

import Glide from '@glidejs/glide';
import '@glidejs/glide/dist/css/glide.core.min.css';

const render = require('./../../globals/helpers/render.js');

class Carousel {
    constructor(node) {
        this.root = node;

        this.init();
    }

    init() {
    }
};

render('.js-glide', Carousel);