import './like.css';

const render = require('./../../globals/helpers/render.js');

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
};

render('.js-like', Like);