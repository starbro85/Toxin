import './expander.css';

class Expander {
    constructor(node) {
        this.root = node;
        this.button = this.root.querySelector('.js-expander__button')
        this.container = this.root.querySelector('.js-expander__container');
   
        this.init();
    }

    expand() {
        this.root.classList.add('expander_expanded');
        this.button.setAttribute('aria-expanded', true)
    };

    collapse() {
        this.root.classList.remove('expander_expanded');
        this.button.setAttribute('aria-expanded', false)
    };

    toggle = () => (this.root.classList.contains('expander_expanded')) ? this.collapse() : this.expand();

    init() {
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