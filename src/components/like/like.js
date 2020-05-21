import './like.css';

import '../icon/icon.js';

class Like {
    constructor(node) {
        this.root = node;
        this.icon = this.root.querySelector('.js-icon');
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
    }
};

function render() {
    const components = document.body.querySelectorAll('.js-like');
    if (components.length > 0) {
      Array.from(components).map((node) => new Like(node));
    };
};

render();