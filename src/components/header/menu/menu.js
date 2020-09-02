import { Expander } from '../../../globals/helpers/expander.js'

export class Menu {
    constructor(node,) {
        this.root = node;
        this.button = this.root.querySelector('.js-menu__button');

        this._init();
    }

    _setExpander() {
        new Expander(this.root, {
            control: this.button,
            toggleClass: 'menu_expanded',
            trapFocus: true,
            outsideClickCollapse: true
        });
    }

    _init() {
        this._setExpander();
    }
}