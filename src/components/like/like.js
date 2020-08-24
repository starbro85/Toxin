import './like.css';

export class Like {
    constructor(node) {
        if (node) {
            this.root = node;
            this.icon = this.root.querySelector('.js-like__icon');
            this.isActive = this.root.hasAttribute('data-active');
        }
    }

    _init() {
        if (this.isActive) {
            this.icon.innerHTML = 'favorite';
            this.root.classList.add('like_active');
        }
        else {
            this.icon.innerHTML = 'favorite_border';
        }
    }

    render(parent) {
        const components = parent ? parent.querySelectorAll('.js-like') : document.querySelectorAll('.js-like');

        if (components.length > 0) {
            Array.from(components).map((node) => new Like(node)._init());
        };
    }
}