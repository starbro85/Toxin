import { Swiper, Autoplay, Lazy } from 'swiper';

Swiper.use([ Autoplay, Lazy ]);

export class Slideshow {
    constructor(node) {
        this.root = node;
        this.autoplay = Number(this.root.dataset.autoplay);
        
        this._init();
    }

    _setSwiper() {
        new Swiper(this.root, {
            spaceBetween: 25,
            autoplay: {
                delay: this.autoplay ? this.autoplay : 10000,
                waitForTransition: false
            },
            lazy: {
                elementClass: 'slideshow__image_lazy',
                loadingClass: 'slideshow__image_loading',
                loadedClass: 'slideshow__image_loaded',
                preloaderClass: 'slideshow__image_preloader'
            },
            containerModifierClass: 'slideshow_',
            wrapperClass: 'slideshow__slides',
            slideClass: 'slideshow__slide',
            slideActiveClass: 'slideshow__slide_active',
            slideDuplicateActiveClass: 'slideshow__duplicate-slide_active',
            slideVisibleClass: 'slideshow__slide_visible',
            slideDuplicateClass: 'slideshow__duplicate-slide',
            slideNextClass: 'slideshow__slide_next',
            slideDuplicateNextClass: 'slideshow__duplicate-slide_next',
            slidePrevClass: 'slideshow__slide_prev',
            slideDuplicatePrevClass: 'slideshow__duplicate-slide_prev',
            slideBlankClass: 'slideshow__slide_blank'
        })
    }

    _init() {
        this._setSwiper();
    }
}