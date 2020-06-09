import './dropdown.css';

import './../text-field/text-field.js';

class Dropdown {
    constructor(node) {
        this.root = node;
        this.button = this.root.querySelector('.js-dropdown__button');
        this.expanded = this.root.dataset.expanded;

        this.init();
    }

    expand() {
        this.root.classList.add('dropdown_expanded');
        this.button.setAttribute('aria-expanded', true);
    };

    collapse() {
        this.root.classList.remove('dropdown_expanded');
        this.button.setAttribute('aria-expanded', false);
        this.removeEventListeners();
    };

    toggle = () => (this.root.classList.contains('dropdown_expanded')) ? this.collapse() : this.expand();

    handleClickEvent = (event) =>   this.button.contains(event.target) ? this.toggle() : 
                                    !this.root.contains(event.target)  ? this.collapse() :
                                    false;

    handleKeydownEvent = (event) => event.which === 32 ? this.handleClickEvent(event) : false;


    handleFocusEvent = (event) => !this.root.contains(event.target) ? this.collapse() : false;

    setEventListeners() {
        document.addEventListener('focusin', this.handleFocusEvent);
        document.addEventListener('mouseup', this.handleClickEvent);
        document.addEventListener('keyup', this.handleKeydownEvent);
    }

    removeEventListeners() {
        document.removeEventListener('focusin', this.handleFocusEvent);
        document.removeEventListener('mouseup', this.handleClickEvent);
        document.removeEventListener('keyup', this.handleKeydownEvent);
    }

    init() {
        this.button.setAttribute('aria-expanded', this.expanded);

        this.button.addEventListener('mouseup', event => this.setEventListeners());
        this.button.addEventListener('keyup', event => this.setEventListeners());
    }
};

function render() {
    const components = document.body.querySelectorAll('.js-dropdown');
    if (components.length > 0) {
        Array.from(components).map((node) => new Dropdown(node));
    };
};

render();

