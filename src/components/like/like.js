import './like.css';

import '../icon/icon.js';

class Like {
    constructor(node) {
        this.root = node;
        this.count = this.root.querySelector('.js-like__count');
        this.icon = this.root.querySelector('.js-icon');
        this.value = this.root.dataset.value;
        this.isActive = this.root.dataset.active;
   
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

        this.count.innerHTML = this.value;
    }
};

function render() {
    const components = document.body.querySelectorAll('.js-like');
    if (components.length > 0) {
      Array.from(components).map((node) => new Like(node));
    };
};

render();