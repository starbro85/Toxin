import './date-dropdown.css';

import './datepicker/datepicker.js';
import '../text-field/text-field.js';
import '../button/button.js';

import { Datepicker } from './datepicker/datepicker.js';
import { TextField } from '../text-field/text-field.js';
import { Expander } from '../../globals/helpers/expander.js';

export class DateDropdown {
    constructor(node) {
        if (node) {    
            this.root = node;
            this.datepicker = this.root.querySelector('.js-datepicker');
            this.lang = this.root.dataset.lang;
            this.isTwin = this.root.hasAttribute('data-is-twin');
            this.autoApply = this.root.hasAttribute('data-auto-apply');
        }
    }

    _setDateAutoUpdate() {
        this.datepicker.addEventListener('datepicker-date-sent', (event) => {
            this.dates = event.detail.dates.map((date) => new Date(date).getTime());
        })
    }

    _getFormattedDates(dates, format) {
        const formattedDates = dates
            .map((date) => date ? new Intl.DateTimeFormat(this.lang, format)
            .format(date) : '');

        return formattedDates;
    }

    _getFormattedDateRange(dates, format) {
        const formattedDateRange = dates ?
            dates
            .reduce((range, date) => date ? `${range} ${new Intl.DateTimeFormat(this.lang, format) 
            .format(date)} - ` : range, '')
            .slice(1, -2) :
            '';

        return formattedDateRange;
    }

    _setTextFieldValues() {
        if (this.isTwin) {
            this.textFields.forEach((textField, index) => {
                new TextField(textField).setValue(this._getFormattedDates(this.dates, { day: '2-digit', month: '2-digit', year: 'numeric' })[index]);
    
                new TextField(textField).setTitle(this._getFormattedDates(this.dates, { day: 'numeric', month: 'long', year: 'numeric' })[index]);
    
                new TextField(textField).setSubmitValue(this.dates[index]);
            });
        } else {
            new TextField(this.textField).setValue(this._getFormattedDateRange(this.dates, { day: 'numeric', month: 'short' }));

            new TextField(this.textField).setTitle(this._getFormattedDateRange(this.dates, { day: 'numeric', month: 'long' }));

            new TextField(this.textField).setSubmitValue(`"${this.dates}"`);
        }
    }

    _setTwinMode() {
        this.textFields = this.root.querySelectorAll('.js-date-dropdown__text-field');
        this.buttons = this.root.querySelectorAll('.js-date-dropdown__button');

        new Datepicker(this.datepicker);

        new Expander(this.root, {
            control: this.buttons,
            multiple: true,
            toggleClass: 'date-dropdown_expanded', 
            trapFocus: true,
            outsideClickCollapse: true
        });
    }
    
    _setSingleMode() {
        this.textField = this.root.querySelector('.js-date-dropdown__text-field');
        this.button = this.root.querySelector('.js-date-dropdown__button');

        new Datepicker(this.datepicker);
        
        new Expander(this.root, {
            control: this.button,
            toggleClass: 'date-dropdown_expanded', 
            trapFocus: true,
            outsideClickCollapse: true
        });
    }

    _setAutoApply() {
        this.datepicker.addEventListener('datepicker-date-sent', (event) => this._setTextFieldValues());
    }

    _setManualApply() {
        this.applyButton = this.root.querySelector('.js-date-dropdown__apply-button');
        this.clearButton = this.root.querySelector('.js-date-dropdown__clear-button');
        
        const setClearButtonDisabledState = () => {
            const clearButtonIsDisabled = this.dates[0] ? false : true;
                
            this.clearButton.disabled = clearButtonIsDisabled;
        }

        this.applyButton.addEventListener('click', (event) => {
            setClearButtonDisabledState();

            this._setTextFieldValues();
        });

        this.clearButton.addEventListener('click', (event) => {
            this.dates = ['', ''];

            this._setTextFieldValues();
            this.datepicker.dispatchEvent(new CustomEvent('datepicker-clear'));
            
            this.clearButton.disabled = true;
        });

        setClearButtonDisabledState();
    }
      
    _init() {
        this._setDateAutoUpdate();

        (this.isTwin) ? this._setTwinMode() : this._setSingleMode();
            
        this._setTextFieldValues();

        (this.autoApply) ? this._setAutoApply() : this._setManualApply();
    }

    render(parent) {
        const components = parent ? parent.querySelectorAll('.js-date-dropdown') : document.querySelectorAll('.js-date-dropdown');

        if (components.length > 0) {
            Array.from(components).map((node) => new DateDropdown(node)._init());
        };
    }
}

