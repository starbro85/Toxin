import '../icon/icon.js';
import './expander.css';

class Expander {
    constructor(node) {
        this.root = node;
        this.button = this.root.querySelector('.js-expander__button')
        this.container = this.root.querySelector('.js-expander__container');
        this.isExpanded = this.root.dataset.isExpanded;
   
        this.init();
    }

    show() {
        this.root.classList.add('expander_is_showed');
    };

    hide() {
        this.root.classList.remove('expander_is_showed');
    };

    toggle = () => (this.root.classList.contains('expander_is_showed')) ? this.hide() : this.show();

    init() {
        if (this.isExpanded) {
            this.show();
        }

        this.button.addEventListener('click', event => this.toggle());
    }
};

function render() {
    const components = document.body.querySelectorAll('.js-expander');
    if (components.length > 0) {
        Array.from(components).map((node) => new Expander(node));
    };
};

render();