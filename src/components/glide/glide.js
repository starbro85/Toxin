import './glide.css';

import Glide from '@glidejs/glide';
import '@glidejs/glide/dist/css/glide.core.min.css';

class Carousel {
    constructor(node) {
        this.root = node;

        this.init();
    }

    init() {
        new Glide(this.root, {
            type: 'carousel',
            startAt: '0',
            perView: '1',
            gap: 0,
        }).mount();
    }
};

function render() {
    const components = document.body.querySelectorAll('.js-glide');
    if (components.length > 0) {
        Array.from(components).map((node) => new Carousel(node));
    };
};

render();