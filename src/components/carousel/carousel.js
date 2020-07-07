import './carousel.css';

import Glide from '@glidejs/glide';
import '@glidejs/glide/dist/css/glide.core.min.css';

const render = require('./../../globals/helpers/render.js');

class Carousel {
    constructor(node) {
        this.root = node;
        this.autoPlay = this.root.hasAttribute('data-auto-play');

        this.init();
    }

    init() {
        new Glide(this.root, {
            type: 'carousel',
            startAt: '0',
            perView: '1',
            gap: 0,
            autoplay: this.autoPlay,
            classes: {
                base: 'carousel',
                track: 'carousel__track',
                slide: 'carousel__item',
                arrows: 'carousel__arrows',
                arrow: 'carousel__arrow',
                arrowNext: 'carousel__next-button',
                arrowPrev: 'carousel__prev-button',
                bullets: 'carousel__bullets',
                bullet: 'carousel__bullet',
                clone: 'clone',
                active: 'active',
                dragging: 'dragging',
                disabled: 'disabled'
            }
        }).mount();
    }
};

render('.js-carousel', Carousel);