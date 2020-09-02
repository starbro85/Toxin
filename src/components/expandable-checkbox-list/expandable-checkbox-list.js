import { Expander } from '../../globals/helpers/expander.js';

class ExpandableCheckboxList {
    constructor(node) {
        this.root = node;
        this.button = this.root.querySelector('.js-expandable-checkbox-list__button');

        this._init();
    }

    _setExpander() {
        new Expander(this.root, {
            control: this.button,
            toggleClass: 'expandable-checkbox-list_expanded', 
            focusTrap: false, 
            outsideClickCollapse: false
        });
    }

    _init() {
        this._setExpander();
    }
}

export default function render () {
    const components = document.querySelectorAll('.js-expandable-checkbox-list');

    if (components.length > 0) {
        Array.from(components).map((node) => new ExpandableCheckboxList(node));
    };
}