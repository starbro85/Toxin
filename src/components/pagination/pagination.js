import './pagination.css';

class Pagination {
    constructor(node) {
        this.root = node;
        this.items = Array.from(this.root.querySelectorAll('.js-pagination__item'));
        this.activeItem = this.root.querySelector('.js-pagination__item_active');
        this.prev = this.root.querySelector('.js-pagination__item_prev');
        this.next = this.root.querySelector('.js-pagination__item_next');
        this.ellipsis = '<li class="pagination__item pagination__item_ellipsis">...</li>';

        this.init();
    }

    normalizeItemsList() {
        const activeItemIndex = this.items.indexOf(this.activeItem);

        if (activeItemIndex > 0) {
            this.prev.classList.add('pagination__item_shown');
            const prevItemLink = this.items[activeItemIndex - 1].querySelector('.js-pagination__link');
            this.prev.querySelector('.js-pagination__link_prev').setAttribute('href', prevItemLink.getAttribute('href'));
        }

        if (activeItemIndex < this.items.length) {
            this.next.classList.add('pagination__item_shown');
            const nextItemLink = this.items[activeItemIndex + 1].querySelector('.js-pagination__link');
            this.next.querySelector('.js-pagination__link_next').setAttribute('href', nextItemLink.getAttribute('href'));
        }

        if (activeItemIndex >= 4) {
            this.items[0].insertAdjacentHTML('afterend', this.ellipsis);
            this.items[0].classList.add('pagination__item_shown');
        }
        if (activeItemIndex < this.items.length - 4) {
            this.items[this.items.length - 1].insertAdjacentHTML('beforebegin', this.ellipsis);
            this.items[this.items.length - 1].classList.add('pagination__item_shown');
        }


        this.items.forEach((item, index) => {
            if ((index >= activeItemIndex - 2) && (index <= activeItemIndex + 2) && (index !== activeItemIndex)) {
                item.classList.add('pagination__item_shown');
            }
        })
    }

    init() {
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