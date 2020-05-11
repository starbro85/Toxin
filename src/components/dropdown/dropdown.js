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

    setEventListener = (event) =>   (!this.root.contains(event.target)) ?
                                        this.root.classList.remove('dropdown_is_showed') :
                                    (Object.is(event.target, this.button)) ?
                                        this.root.classList.toggle('dropdown_is_showed') :
                                    this.root.classList.add('dropdown_is_showed');

    init() {
        if (this.root.dataset.show === true)
            this.root.classList.add('dropdown_is_showed');

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

