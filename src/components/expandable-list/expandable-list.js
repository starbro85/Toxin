import './expandable-list.css';

const render = require('./../../globals/helpers/render.js');

import { Expander } from '../../globals/helpers/expander.js';

class ExpandableList {
    constructor(node, Expand) {
        this.root = node;
        this.button = this.root.querySelector('.js-expandable-list__button');

        this.Expander = Expander;

        this.init();
    }

    init() {
        new this.Expander(this.root, this.button, 'expandable-list_expanded');
    }
}

render('.js-expandable-list', ExpandableList, Expander);