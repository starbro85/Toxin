import './form-booking.css';

import './tooltip/tooltip.js';
import '../button/button.js';
import '../quantity-dropdown/quantity-dropdown.js';

import { DateDropdown } from '../date-dropdown/date-dropdown.js';
import { QuantityDropdown } from '../quantity-dropdown/quantity-dropdown.js';

export class FormBooking {
    constructor(node) {
        if (node) {
            this.root = node;
        }
    }

    _init() { 
        new DateDropdown().render(this.root);
        new QuantityDropdown().render(this.root);
    }

    render(parent) {
        const components = parent ? parent.querySelectorAll('.js-form-booking') : document.querySelectorAll('.js-form-booking');

        if (components.length > 0) {
            Array.from(components).map((node) => new FormBooking(node)._init());
        };
    }
};