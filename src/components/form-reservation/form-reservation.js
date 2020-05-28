import './../button/button.js';
import './../date-dropdown/date-dropdown.js';
import './../dropdown/dropdown.js';

import './form-reservation.css';

class FormReservation {
    constructor(node) {
        this.root = node;
        

        this.init();
    }

    init() {
        
    }
};

function render() {
    const components = document.body.querySelectorAll('.js-form-reservation');
    if (components.length > 0) {
        Array.from(components).map((node) => new FormReservation(node));
    };
};

render();