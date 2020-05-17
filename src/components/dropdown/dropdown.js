import './../icon/icon.js';
import './../text-field/text-field.js';
import './dropdown.css';

class Dropdown {
    constructor(node) {
        this.root = node;
        this.button = this.root.querySelector('.js-dropdown__button');
        this.container = this.root.querySelector('.js-dropdown__container');
        this.input = this.root.querySelector('.js-text-field__input');
        this.theme = this.root.dataset.theme;
        this.isShow = this.root.dataset.stateShow;

        this.init();
    }

    show() {
        this.root.classList.add('dropdown_is_showed');
    };

    hide() {
        this.root.classList.remove('dropdown_is_showed');
        this.removeEventListeners();
    };

    toggle = () => (this.root.classList.contains('dropdown_is_showed')) ? this.hide() : this.show();

    handleClickEvent = (event) =>   this.button.contains(event.target) ? this.toggle() : 
                                    this.container.contains(event.target) ? this.show() : 
                                    this.hide();

    handleFocusEvent = (event) => { if (!this.root.contains(event.target)) this.hide() };

    setEventListeners() {
        document.addEventListener('focusin', this.handleFocusEvent);
        document.addEventListener('click', this.handleClickEvent);
    }

    removeEventListeners() {
        document.removeEventListener('click', this.handleClickEvent);
        document.removeEventListener('focusin', this.handleFocusEvent);
    }

    init() {
        this.root.classList.add('dropdown_theme_' + this.theme);

        if (this.stateShow) {
            this.show();
        }

        this.button.addEventListener('click', event => this.setEventListeners());
    }
};

function render() {
    const components = document.body.querySelectorAll('.js-dropdown');
    if (components.length > 0) {
        Array.from(components).map((node) => new Dropdown(node));
    };
};

render();

