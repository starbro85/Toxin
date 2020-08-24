import './filter.css';

import '../../slider/slider.js';
import '../../date-dropdown/date-dropdown.js';
import '../../quantity-dropdown/quantity-dropdown.js';
import '../../checkbox-list/checkbox-list.js';
import '../../expandable-checkbox-list/expandable-checkbox-list.js';


import { Slider } from '../../slider/slider.js';
import { DateDropdown } from '../../date-dropdown/date-dropdown.js';
import { QuantityDropdown } from '../../quantity-dropdown/quantity-dropdown.js';
import { ExpandableCheckboxList } from '../../expandable-checkbox-list/expandable-checkbox-list.js';

export class Filter {
    constructor(node) {
        this.root = node;

        this._init();
    }

    _init() {
        new Slider().render(this.root);
        new DateDropdown().render(this.root);
        new QuantityDropdown().render(this.root);
        new ExpandableCheckboxList().render(this.root);
    }
}