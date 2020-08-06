import './header.css';
import './menu/menu.css';

import './../logo/logo.js';
import './../link/link.js';
import './../link-list/link-list.js';

import { Expander } from '../../globals/helpers/expander.js'
import { Menu } from './menu/menu.js'

const render = require('./../../globals/helpers/render.js');

class Header {
    constructor(node, Menu, Expander) {
        this.root = node;
        this.button = this.root.querySelector('.js-header__button');
        this.menu = this.root.querySelectorAll('.js-menu');

        this.Menu = Menu;
        this.Expander = Expander;

        this.init();
    }

    init() {
        new this.Expander(this.root, {
            control: this.button,
            toggleClass: 'header_expanded',
            trapFocus: true,
            outsideClickCollapse: true,
            disableOutsideEvents: true
        })
        this.menu.forEach((item) => new this.Menu(item, this.Expander));
    }
}

render('.js-header', Header, Menu, Expander);
