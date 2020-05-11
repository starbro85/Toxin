import './../icon/icon.js';
import './../text-field/text-field.js';
import './dropdown.css';

class Dropdown {
    constructor(node) {
        this.root = node;
        this.button = this.root.querySelector('.js-dropdown__button');
        this.container = this.root.querySelector('.js-dropdown__container')
        
        this.tabbableElements = this.root.querySelector('[tabindex]');

        this.init();
    }

    show() {
        this.root.classList.add('dropdown_is_showed');
    };

    hide() {
        this.root.classList.remove('dropdown_is_showed');
    };

    toggle() {
        this.root.classList.toggle('dropdown_is_showed');
    };

    setEventListener = (event) =>   (!this.root.contains(event.target)) ?
                                        this.hide() :
                                    (Object.is(event.target, this.button)) ?
                                        this.toggle() :
                                    this.show();

    init() {
        if (this.root.dataset.show === true)
            this.show();

        document.onclick = this.setEventListener;
    }
};

function render() {
    const components = document.querySelectorAll('.js-dropdown');
    if (components.length > 0) {
        Array.from(components).map((node) => new Dropdown(node));
    };
};

render();

