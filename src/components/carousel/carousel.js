import './carousel.css';

import { Swiper, Navigation, Autoplay } from 'swiper';
import 'swiper/swiper-bundle.min.css';

Swiper.use([Navigation, Autoplay]);

const render = require('./../../globals/helpers/render.js');

class Carousel {
    constructor(node) {
        this.root = node;
        this.controls = this.root.querySelector('.js-carousel__controls');
        
        this.autoplay = Number(this.root.dataset.autoplayDelay);

        this.init();
    }

    init() {
        window.addEventListener('load', (event) => {
            const swiper = new Swiper(this.root, {
                navigation: {
                    nextEl: '.js-carousel__control-button_next',
                    prevEl: '.js-carousel__control-button_prev',
                },
                autoplay: {
                    delay: this.autoplay ? this.autoplay : false,
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

            if (this.controls) {
                this.controls.addEventListener('keyup', event => {
                    if (event.key === 'ArrowRight') {
                        swiper.slideNext();
                    }

                    if (event.key === 'ArrowLeft') {
                        swiper.slidePrev();
                    }
                })
            }    
        }); 
    }
};

render('.js-carousel', Carousel);