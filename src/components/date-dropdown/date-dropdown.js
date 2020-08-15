import './date-dropdown.css';

import './datepicker/datepicker.js';
import '../text-field/text-field.js';
import '../button/button.js';

import { Datepicker } from './datepicker/datepicker.js';
import { Expander } from '../../globals/helpers/expander.js';

class DateDropdown {
    constructor(node) {
        this.root = node;
        this.datepicker = this.root.querySelector('.js-datepicker');

        this.init();
    }
      
    init() {
    }
}

export function renderDateDropdown (parentNode) {
    const components = parentNode ? parentNode.querySelectorAll('.js-date-dropdown') : document.querySelectorAll('.js-date-dropdown');
    if (components.length > 0) {
        Array.from(components).map((node) => new DateDropdown(node));
    };
}