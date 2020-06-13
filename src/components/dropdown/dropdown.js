import './dropdown.css';

import './../text-field/text-field.js';

class Dropdown {
    constructor(node) {
        this.root = node;
        this.isMultiple = Boolean(this.root.dataset.isMultiple);
        this.expanded = Boolean(this.root.dataset.expanded);
        this.button = this.isMultiple ? this.root.querySelectorAll('.js-dropdown__button') : this.root.querySelector('.js-dropdown__button');
        

        this.init();
    }

    expand() {
        this.root.classList.add('dropdown_expanded');

        this.isMultiple ? this.button.forEach(item => item.setAttribute('aria-expanded', true)) : this.button.setAttribute('aria-expanded', true);
    };

    collapse() {
        this.root.classList.remove('dropdown_expanded');
        this.isMultiple ? this.button.forEach(item => item.setAttribute('aria-expanded', false)) : this.button.setAttribute('aria-expanded', false);
        this.removeEventListeners();
    };

    toggle = () => (this.root.classList.contains('dropdown_expanded')) ? this.collapse() : this.expand();

    handleClickEvent = event => {
        if (event.which === 1 || event.which === 32) {
            if (this.isMultiple) {
                Array.from(this.button).reduce((acc, item) => item.contains(event.target) ? true : acc, false) ? this.toggle() :
                !this.root.contains(event.target)  ? this.collapse() :
                false;
            }
            else {
                this.button.contains(event.target) ? this.toggle() :
                !this.root.contains(event.target)  ? this.collapse() :
                false;
            }
        } 
    }

    handleFocusEvent = event => !this.root.contains(event.target) ? this.collapse() : false;

    setEventListeners() {
        document.addEventListener('focusin', this.handleFocusEvent);
        document.addEventListener('mouseup', this.handleClickEvent);
        document.addEventListener('keyup', this.handleClickEvent);
    }

    removeEventListeners() {
        document.removeEventListener('focusin', this.handleFocusEvent);
        document.removeEventListener('mouseup', this.handleClickEvent);
        document.removeEventListener('keyup', this.handleClickEvent);
    }

    init() {
        if (this.isMultiple) {
            this.button.forEach(item => {
                item.setAttribute('aria-expanded', this.expanded);
                item.addEventListener('mouseup', event => this.setEventListeners());
                item.addEventListener('keyup', event => this.setEventListeners());
            });
        }
        else {
            this.button.setAttribute('aria-expanded', this.expanded);
            this.button.addEventListener('mouseup', event => this.setEventListeners());
            this.button.addEventListener('keyup', event => this.setEventListeners());
        }      
    }
};

function render() {
    const components = document.body.querySelectorAll('.js-dropdown');
    if (components.length > 0) {
        Array.from(components).map((node) => new Dropdown(node));
    };
};

render();

