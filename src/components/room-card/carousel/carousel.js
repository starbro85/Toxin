import { Swiper, Navigation, Lazy } from 'swiper';

Swiper.use([ Navigation, Lazy ]);

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
    };

    _setKeyboardNavigation() {
        this.buttonPrev.addEventListener('keyup', this._handleKeyboardControl);
        this.buttonNext.addEventListener('keyup', this._handleKeyboardControl);
    }

    _setSwiper() {
        new Swiper(this.root, {
            preloadImages: false,
            navigation: {
                nextEl: this.buttonNext,
                prevEl: this.buttonPrev,
            },
            lazy: {
                loadOnTransitionStart: true,
                elementClass: 'carousel__image_lazy',
                loadingClass: 'carousel__image_loading',
                loadedClass: 'carousel__image_loaded',
                preloaderClass: 'carousel__image_preloader'
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
        });

    }

    _init() {
        document.addEventListener('DOMContentLoaded' , event => this._setSwiper());
        this._setKeyboardNavigation();
    }
}