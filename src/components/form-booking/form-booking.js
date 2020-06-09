import './form-booking.css';

import './../button/button.js';
import './../date-dropdown/date-dropdown.js';
import './../quantity-dropdown/quantity-dropdown.js';

class FormBooking {
    constructor(node) {
        this.root = node;
        

        this.init();
    }

    init() {
        
    }
};

function render() {
    const components = document.body.querySelectorAll('.js-form-booking');
    if (components.length > 0) {
        Array.from(components).map((node) => new FormBooking(node));
    };
};

render();