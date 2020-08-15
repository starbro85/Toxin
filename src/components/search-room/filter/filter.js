import './filter.css';

import '../../slider/slider.js';
import '../../date-dropdown/date-dropdown.js';
import '../../quantity-dropdown/quantity-dropdown.js';
import '../../checkbox-list/checkbox-list.js';
import '../../expandable-checkbox-list/expandable-checkbox-list.js';


import { renderSlider } from '../../slider/slider.js';
import { renderDateDropdown } from '../../date-dropdown/date-dropdown.js';
import { renderQuantityDropdown } from '../../quantity-dropdown/quantity-dropdown.js';
import { renderExpandableCheckboxList } from '../../expandable-checkbox-list/expandable-checkbox-list.js';

export class Filter {
    constructor(node) {
        this.root = node;

        this.init();
    }

    init() {
        renderSlider(this.root);
        renderDateDropdown(this.root);
        renderQuantityDropdown(this.root);
        renderExpandableCheckboxList(this.root);
    }
}