import './date-dropdown.css';

import './datepicker/datepicker.js';
import '../text-field/text-field.js';
import '../button/button.js';

import { Datepicker } from './datepicker/datepicker.js';
import { Expander } from '../../globals/helpers/expander.js';

export class DateDropdown {
    constructor(node) {
        if (node) {    
            this.root = node;
            this.datepicker = this.root.querySelector('.js-datepicker');
            this.emptyDiv = this.root.querySelector('.js-datepicker__empty-div');
            this.initValue = this.root.dataset.initValue
                ? JSON.parse(this.root.dataset.initValue)
                : '';
            this.lang = this.root.dataset.lang;
            this.isTwin = this.root.hasAttribute('data-is-twin');
        }
    }

    setTwinMode() {
        this.buttons = this.root.querySelectorAll('.js-date-dropdown__button');

        new Expander(this.root, {
            control: this.buttons,
            multiple: true,
            toggleClass: 'date-dropdown_expanded', 
            trapFocus: true,
            outsideClickCollapse: true
        })
    }
    
    setSingleMode() {
        this.button = this.root.querySelector('.js-date-dropdown__button');
        
        new Expander(this.root, {
            control: this.button,
            toggleClass: 'date-dropdown_expanded', 
            trapFocus: true,
            outsideClickCollapse: true
        })
    }
      
    _init() {
        new Datepicker(this.datepicker);
        
        if (this.isTwin) {
            this.setTwinMode();
        } else {
            this.setSingleMode();
        }
    }

    render(parent) {
        const components = parent ? parent.querySelectorAll('.js-date-dropdown') : document.querySelectorAll('.js-date-dropdown');

        if (components.length > 0) {
            Array.from(components).map((node) => new DateDropdown(node)._init());
        };
    }
}

