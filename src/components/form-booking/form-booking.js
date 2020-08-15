import './form-booking.css';

import './tooltip/tooltip.js';
import '../button/button.js';
import '../quantity-dropdown/quantity-dropdown.js';

class FormBooking {
    constructor(node) {
        this.root = node;
        this.dateDropdown = this.root.querySelector('.js-form-booking__date-dropdown');

        this.init();
    }

    init() { 
    }
};

export function renderFormBooking (parentNode) {
    const components = parentNode ? parentNode.querySelectorAll('.js-form-booking') : document.querySelectorAll('.js-form-booking');
    if (components.length > 0) {
        Array.from(components).map((node) => new FormBooking(node));
    };
}