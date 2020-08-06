import './expandable-checkbox-list.css';

import '../checkbox-list/checkbox-list.js';

const render = require('./../../globals/helpers/render.js');

import { Expander } from '../../globals/helpers/expander.js';

class ExpandableList {
    constructor(node, Expander) {
        this.root = node;
        this.button = this.root.querySelector('.js-expandable-checkbox-list__button');

        this.Expander = Expander;

        this.init();
    }

    init() {
        new this.Expander(this.root, {
            control: this.button,
            toggleClass: 'expandable-checkbox-list_expanded', 
            focusTrap: false, 
            outsideClickCollapse: false
        });
    }
}

render('.js-expandable-checkbox-list', ExpandableList, Expander);