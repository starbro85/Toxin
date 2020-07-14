import './carousel.css';

import Glide from '@glidejs/glide';
import '@glidejs/glide/dist/css/glide.core.min.css';

const render = require('./../../globals/helpers/render.js');

class Carousel {
    constructor(node) {
        this.root = node;
        this.autoPlay = Number(this.root.dataset.autoPlay);

        this.init();
    }

    init() {
        let  glide;

        window.addEventListener('load', event => glide = new Glide(this.root, {
            type: 'slider', 
            keyboard: false,
            autoplay: this.autoPlay,
            gap: 0
        }).mount())

        this.root.addEventListener('keyup', event => {
            if (event.key === 'ArrowRight') {
                glide.go('>');
            }

            if (event.key === 'ArrowLeft') {
                glide.go('<');
            }
        })
    }
};

render('.js-carousel', Carousel);