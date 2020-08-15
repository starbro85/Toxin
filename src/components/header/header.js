import './header.css';

import './menu/menu.css';
import '../logo/logo.js';
import '../link/link.js';
import '../link-list/link-list.js';

import { Menu } from './menu/menu.js'
import { Expander } from '../../globals/helpers/expander.js'

class Header {
    constructor(node,) {
        this.root = node;
        this.button = this.root.querySelector('.js-header__button');
        this.menu = this.root.querySelectorAll('.js-menu');

        this.init();
    }

    init() {
        new Expander(this.root, {
            control: this.button,
            toggleClass: 'header_expanded',
            trapFocus: true,
            outsideClickCollapse: true,
            disableOutsideEvents: true
        });

        this.menu.forEach((item) => new Menu(item))
    }
}

export function renderHeader (parentNode) {
    const components = parentNode ? parentNode.querySelectorAll('.js-header') : document.querySelectorAll('.js-header');
    if (components.length > 0) {
        Array.from(components).map((node) => new Header(node));
    };
}