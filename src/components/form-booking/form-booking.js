import './form-booking.css';

import './../button/button.js';
import './../date-dropdown/date-dropdown.js';
import './../quantity-dropdown/quantity-dropdown.js';

const pluralize = require('./../../globals/helpers/pluralize.js');
const render = require('./../../globals/helpers/render.js');

class FormBooking {
    constructor(node) {
        this.root = node;

        this.init();
    }

    init() {   
    }
};

render('.js-form-booking', FormBooking);