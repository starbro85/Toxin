import { Slideshow } from './slideshow/slideshow.js';

class Landing {
    constructor(node) {
        this.root = node;
        this.slideshow = this.root.querySelector('.js-slideshow');

        this._init();
    }

    _setSlideshow() {
        new Slideshow(this.slideshow);
    }

    _init() {
        this._setSlideshow();
    }
}

export default function render () {
    const components = document.querySelectorAll('.js-landing');

    if (components.length > 0) {
        Array.from(components).map((node) => new Landing(node));
    };
}