import { Menu } from './menu/menu.js'
import { Expander } from '../../globals/helpers/expander.js'

class Header {
    constructor(node) {
        this.root = node;
        this.button = this.root.querySelector('.js-header__button');
        this.menu = this.root.querySelectorAll('.js-menu');

        this._init();
    }

    _setExpander() {
        new Expander(this.root, {
            control: this.button,
            toggleClass: 'header_expanded',
            trapFocus: true,
            outsideClickCollapse: true
        });
    }

    _setMenues() {
        this.menu.forEach((item) => new Menu(item))
    }

    _init() {
        this._setExpander();
        this._setMenues();
    }
}

export default function render () {
    const components = document.querySelectorAll('.js-header');

    if (components.length > 0) {
        Array.from(components).map((node) => new Header(node));
    };
}