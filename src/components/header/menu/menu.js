import './menu.css';

import { Expander } from '../../../globals/helpers/expander.js'

export class Menu {
    constructor(node,) {
        this.root = node;
        this.button = this.root.querySelector('.js-menu__button');

        this.init();
    }

    init() {
        new Expander(this.root, {
            control: this.button,
            toggleClass: 'menu_expanded',
            trapFocus: true,
            outsideClickCollapse: true
        });
    }
}