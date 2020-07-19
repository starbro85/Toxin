import './expandable-checkbox-list.css';

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
        new this.Expander(this.root, this.button, 'expandable-checkbox-list_expanded');
    }
}

render('.js-expandable-checkbox-list', ExpandableList, Expander);