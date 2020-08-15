import './carousel.css';

import { Swiper, Navigation, Autoplay, Lazy } from 'swiper';

Swiper.use([Navigation, Autoplay, Lazy]);

class Carousel {
    constructor(node) {
        this.root = node;
        this.buttonPrev = this.root.querySelector('.js-carousel__control-button_prev');
        this.buttonNext = this.root.querySelector('.js-carousel__control-button_next');
        
        this.autoplayDelay = this.root.hasAttribute('data-autoplay');
        this.showControls = this.root.hasAttribute('data-show-controls');

        this.init();
    }

    handleKeyboardControl = (event) => {
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

    init() {
        window.addEventListener('load', event => {
            new Swiper(this.root, {
                navigation: this.showControls ? {
                    nextEl: this.buttonNext,
                    prevEl: this.buttonPrev,
                } : false,
                autoplay: this.autoplayDelay ? {
                    delay: 10000
                } : false,
                preloadImages: false,
                lazy: {
                    loadPrevNext: true,
                    loadOnTransitionStart: true,
                    elementClass: 'carousel__image_lazy',
                    loadingClass: 'carousel__image_loading',
                    loadedClass: 'carousel__image_loaded',
                    preloaderClass: 'carousel__image-preloader'
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

            if (this.buttonPrev) { this.buttonPrev.addEventListener('keyup', this.handleKeyboardControl); }
            if (this.buttonNext) { this.buttonNext.addEventListener('keyup', this.handleKeyboardControl); }
        })   
    }
}

export function renderCarousel (parentNode) {
    const components = parentNode ? parentNode.querySelectorAll(selector) : document.querySelectorAll(selector);
    if (components.length > 0) {
        Array.from(components).map((node) => new Carousel(node));
    };
}