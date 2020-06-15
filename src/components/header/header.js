import './header.css';

import './../logo/logo.js';
import './../nav/nav.js';
import './../link/link.js';
import './../sign-in/sign-in.js';

class Header {
    constructor(node) {
        this.root = node;
        this.button = this.root.querySelector('.js-header__button')
        this.list = this.root.querySelector('.js-header__list');
   
        this.init();
    }

    expand() {
        this.root.classList.add('header_expanded');
        this.button.setAttribute('aria-expanded', true)
    };

    collapse() {
        this.root.classList.remove('header_expanded');
        this.button.setAttribute('aria-expanded', false)
    };

    toggle = () => (this.root.classList.contains('header_expanded')) ? this.collapse() : this.expand();

    handleClickEvent = event => {
        this.button.contains(event.target) ? this.toggle() :
        !this.root.contains(event.target)  ? this.collapse() :
        false;
    }

    handleFocusEvent = event => !this.root.contains(event.target) ? this.collapse() : false;

    setEventListeners() {
        document.addEventListener('focusin', this.handleFocusEvent);
        document.addEventListener('click', this.handleClickEvent);
    }

    init() {
        this.button.addEventListener('click', event => this.setEventListeners());
    }
};

function render() {
    const components = document.body.querySelectorAll('.js-header');
    if (components.length > 0) {
        Array.from(components).map((node) => new Header(node));
    };
};

render();