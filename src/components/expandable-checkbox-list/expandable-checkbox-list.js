import './expandable-checkbox-list.css';

import '../checkbox-list/checkbox-list.js';

import { Expander } from '../../globals/helpers/expander.js';

class ExpandableCheckboxList {
    constructor(node) {
        this.root = node;
        this.button = this.root.querySelector('.js-expandable-checkbox-list__button');

        this.init();
    }

    init() {
        new Expander(this.root, {
            control: this.button,
            toggleClass: 'expandable-checkbox-list_expanded', 
            focusTrap: false, 
            outsideClickCollapse: false
        });
    }
}

export function renderExpandableCheckboxList (parentNode) {
    const components = parentNode ? parentNode.querySelectorAll('.js-expandable-checkbox-list') : document.querySelectorAll('.js-expandable-checkbox-list');
    if (components.length > 0) {
        Array.from(components).map((node) => new ExpandableCheckboxList(node));
    };
}