import './room-card.css';

import './carousel/carousel.js';
import '../rate-bar/rate-bar.js';

import { Carousel } from './carousel/carousel.js';

export class RoomCard {
    constructor(node) {
        if (node) {
            this.root = node;
            this.carousel = this.root.querySelector('.js-carousel');
        }       
    }

    _init() {
        new Carousel(this.carousel);
    }

    render(parent) {
        const components = parent ? parent.querySelectorAll('.js-room-card') : document.querySelectorAll('.js-room-card');

        if (components.length > 0) {
            Array.from(components).map((node) => new RoomCard(node)._init());
        };
    }
}