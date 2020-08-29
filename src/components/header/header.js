import './header.css';

import './menu/menu.css';
import '../logo/logo.js';
import '../link/link.js';
import '../link-list/link-list.js';

import { Menu } from './menu/menu.js'
import { Expander } from '../../globals/helpers/expander.js'

export class Header {
    constructor(node) {
        if (node) {
            this.root = node;
            this.button = this.root.querySelector('.js-header__button');
            this.menu = this.root.querySelectorAll('.js-menu');
        }
    }

    _init() {
        new Expander(this.root, {
            control: this.button,
            toggleClass: 'header_expanded',
            trapFocus: true,
            outsideClickCollapse: true
        });

        this.menu.forEach((item) => new Menu(item))
    }

    render(parent) {
        const components = parent ? parent.querySelectorAll('.js-header') : document.querySelectorAll('.js-header');

        if (components.length > 0) {
            Array.from(components).map((node) => new Header(node)._init());
        };
    }
}

