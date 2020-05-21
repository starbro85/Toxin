import './pagination.css';

import './../icon/icon.js';

class Pagination {
    constructor(node) {
        this.root = node;
        this.items = Array.from(this.root.querySelectorAll('.js-pagination__item'));
        this.activeItem = this.root.querySelector('.js-pagination__item_active');
        this.prevButton = this.root.querySelector('.js-pagination__prev-button');
        this.nextButton = this.root.querySelector('.js-pagination__next-button');
        this.ellipsis = '<div class="pagination__ellipsis">...</div>';

        this.init();
    }

    setPrevButtonsDisabledState() {
        const isDisabled = Object.is(this.items[0], this.activeItem);
        this.prevButton.disabled = isDisabled;
    }

    setNextButtonsDisabledState() {
        const isDisabled = Object.is(this.items[this.items.length - 1], this.activeItem);
        this.nextButton.disabled = isDisabled;
    }

    normalizeItemsList() {
        const activeItemIndex = this.items.indexOf(this.activeItem);

        if (activeItemIndex >= 4) {
            this.items[0].insertAdjacentHTML('afterend', this.ellipsis);
            this.items[0].classList.add('pagination__item_is_showed');
        }
        if (activeItemIndex < this.items.length - 4) {
            this.items[this.items.length - 1].insertAdjacentHTML('beforebegin', this.ellipsis);
            this.items[this.items.length - 1].classList.add('pagination__item_is_showed');
        }


        this.items.forEach((item, index) => {
            if ((index >= activeItemIndex - 2) && (index <= activeItemIndex + 2)) { 
                item.classList.add('pagination__item_is_showed');
            }
        })
    }

    init() {
        this.setPrevButtonsDisabledState();
        this.setNextButtonsDisabledState();
        this.normalizeItemsList();
    }
};

function render() {
    const components = document.body.querySelectorAll('.js-pagination');
    if (components.length > 0) {
        Array.from(components).map((node) => new Pagination(node));
    };
};

render();