import './date-dropdown.css';

import '../datepicker/datepicker.js';
 
import moment from 'moment';

const render = require('./../../globals/helpers/render.js');

class DateDropdown {
    constructor(node) {
        this.root = node;

        this.init();
    }

    init() {
        
    }
};

render('.js-date-dropdown', DateDropdown);