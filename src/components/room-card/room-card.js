import { Carousel } from './carousel/carousel.js';

class RoomCard {
    constructor(node) {
        this.root = node;
        this.carousel = this.root.querySelector('.js-carousel'); 
        
        this._init();
    }

    _setCarousel() {
        new Carousel(this.carousel);
    }

    _init() {
        this._setCarousel();
    }
}

export default function render () {
    const components = document.querySelectorAll('.js-room-card');

    if (components.length > 0) {
        Array.from(components).map((node) => new RoomCard(node));
    };
}