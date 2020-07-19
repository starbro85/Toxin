import './carousel.css';

import { Swiper, Navigation, Autoplay, Lazy } from 'swiper';

Swiper.use([Navigation, Autoplay, Lazy]);

const render = require('./../../globals/helpers/render.js');

class Carousel {
    constructor(node) {
        this.root = node;
        this.buttonPrev = this.root.querySelector('.js-carousel__control-button_prev');
        this.buttonNext = this.root.querySelector('.js-carousel__control-button_next');
        
        this.autoplayDelay = Number(this.root.dataset.autoplayDelay);

        this.init();
    }

    init() {
        const swiper = new Swiper(this.root, {
            navigation: {
                nextEl: '.js-carousel__control-button_next',
                prevEl: '.js-carousel__control-button_prev',
            },
            autoplay: this.autoplayDelay ? {
                delay: this.autoplayDelay
            } : false,
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

        this.buttonPrev.addEventListener('keyup', (event) => {
            if (event.key === 'ArrowRight') {
                this.buttonNext.focus();
                swiper.slideNext();
            }

            if (event.key === 'ArrowLeft') {
                swiper.slidePrev();
            }
        })

        this.buttonNext.addEventListener('keyup', (event) => {
            if (event.key === 'ArrowRight') {
                swiper.slideNext();
            }

            if (event.key === 'ArrowLeft') {
                this.buttonPrev.focus();
                swiper.slidePrev();
            }
        })
    }
};

render('.js-carousel', Carousel);