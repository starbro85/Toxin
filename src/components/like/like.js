import './like.css';

class Like {
    constructor(node) {
        this.root = node;
        this.icon = this.root.querySelector('.js-like__icon');
        this.isActive = this.root.hasAttribute('data-active');
   
        this.init();
    }

    init() {
        if (this.isActive) {
            this.icon.innerHTML = 'favorite';
            this.root.classList.add('like_active');
        }
        else {
            this.icon.innerHTML = 'favorite_border';
        }
    }
}

export function renderLike (parentNode) {
    const components = parentNode ? parentNode.querySelectorAll('.js-like') : document.querySelectorAll('.js-like');
    if (components.length > 0) {
        Array.from(components).map((node) => new Like(node));
    };
}