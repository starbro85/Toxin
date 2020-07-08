import './carousel.css';

import Glide from '@glidejs/glide';
import '@glidejs/glide/dist/css/glide.core.min.css';

const render = require('./../../globals/helpers/render.js');

class Carousel {
    constructor(node) {
        this.root = node;
        this.autoPlay = Number(this.root.dataset.autoPlay);
        this.perView = Number(this.root.dataset.perView);

        this.init();
    }

    init() {
        const carousel = new Glide(this.root, {
            type: 'slider',
            autoplay: this.autoPlay,
            gap: 10
        }).mount();

        console.log(carousel.remove);
    }
};

render('.js-carousel', Carousel);