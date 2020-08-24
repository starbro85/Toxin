import './carousel.css';

import { Swiper, Navigation } from 'swiper';

Swiper.use([ Navigation ]);

export class Carousel {
    constructor(node) {
        this.root = node;
        this.buttonPrev = this.root.querySelector('.js-carousel__control_prev');
        this.buttonNext = this.root.querySelector('.js-carousel__control_next');

        this._init();
    }

    _handleKeyboardControl = (event) => {
        if (event.target === this.buttonPrev) {
            if (event.key === 'ArrowRight') {
                this.buttonNext.focus();
                this.buttonNext.click();
            }

            if (event.key === 'ArrowLeft') {
                this.buttonPrev.click();
            }
        }

        if (event.target === this.buttonNext) {
            if (event.key === 'ArrowRight') {
                this.buttonNext.click();
            }

            if (event.key === 'ArrowLeft') {
                this.buttonPrev.focus();
                this.buttonPrev.click();
            }
        }
    }

    _init() {
        new Swiper(this.root, {
            navigation: {
                nextEl: this.buttonNext,
                prevEl: this.buttonPrev,
            },
            containerModifierClass: 'carousel_',
            wrapperClass: 'carousel__slides',
            slideClass: 'carousel__slide',
            slideActiveClass: 'carousel__slide_active',
            slideDuplicateActiveClass: 'carousel__duplicate-slide_active',
            slideVisibleClass: 'carousel__slide_visible',
            slideDuplicateClass: 'carousel__duplicate-slide',
            slideNextClass: 'carousel__slide_next',
            slideDuplicateNextClass: 'carousel__duplicate-slide_next',
            slidePrevClass: 'carousel__slide_prev',
            slideDuplicatePrevClass: 'carousel__duplicate-slide_prev',
            slideBlankClass: 'carousel__slide_blank'
        })

        if (this.buttonPrev) { this.buttonPrev.addEventListener('keyup', this._handleKeyboardControl); }
        if (this.buttonNext) { this.buttonNext.addEventListener('keyup', this._handleKeyboardControl); }
    }
}