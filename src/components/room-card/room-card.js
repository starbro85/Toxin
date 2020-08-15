import './room-card.css';

import './carousel/carousel.js';
import '../rate-bar/rate-bar.js';

import { Carousel } from './carousel/carousel.js';

const render = require('../../globals/helpers/render.js');

class RoomCard {
    constructor(node) {
        this.root = node;
        this.carousel = this.root.querySelector('.js-carousel');

        this.init();
    }

    setCarousel() {
        new Carousel(this.carousel);
    }

    init() {
        this.setCarousel();
    }
}

export function renderRoomCard (parentNode) {
    const components = parentNode ? parentNode.querySelectorAll('.js-room-card') : document.querySelectorAll('.js-room-card');
    if (components.length > 0) {
        Array.from(components).map((node) => new RoomCard(node));
    };
}