import '../icon/icon.js';
import './like-button.css';

class LikeButton {
    constructor(node) {
        this.root = node;
        this.value = this.root.querySelector('.js-like-button__value');
        this.icon = this.root.querySelector('.js-icon');
        this.isActive = this.root.dataset.active;
   
        this.init();
    }

    handleToggle = event => {
        if (this.isActive) {
            this.root.classList.remove('like-button_active');
            this.isActive = false;
            const value = Number(this.value.innerHTML) - 1;
            this.value.innerHTML = value;
            this.icon.innerHTML = 'favorite_border';
        } 
        else {
            this.root.classList.add('like-button_active');
            this.isActive = true;
            const value = Number(this.value.innerHTML) + 1;
            this.value.innerHTML = value;
            this.icon.innerHTML = 'favorite';
        }  
    }

    init() {
        if (this.isActive) {
            this.icon.innerHTML = 'favorite';
            this.root.classList.add('like-button_active');
        }
        else {
            this.icon.innerHTML = 'favorite_border';
        }

        this.root.addEventListener('click', this.handleToggle);
    }
};

function render() {
    const components = document.body.querySelectorAll('.js-like-button');
    if (components.length > 0) {
      Array.from(components).map((node) => new LikeButton(node));
    };
};

render();