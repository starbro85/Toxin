import './date-dropdown.css';

import './datepicker/datepicker.js';
 
import moment from 'moment';
import { Datepicker } from './datepicker/datepicker.js';
import { Expander } from '../../globals/helpers/expander.js';

const render = require('./../../globals/helpers/render.js');
const capitalize = require('./../../globals/helpers/capitalize.js');

class DateDropdown {
    constructor(node, Expander, Datepicker) {
        this.root = node;
        this.datepicker = this.root.querySelector('.js-datepicker');

        this.isTwin = this.root.hasAttribute('data-is-twin');
        this.autoApply = this.root.hasAttribute('data-auto-apply');

        this.datepickerData = {};

        this.Expander = Expander;
        this.Datepicker = Datepicker;

        this.init();
    }
      
    getDatepickerData = (event) => {
        const datepickerValues = event.detail.values;
        const datepickerLang = event.detail.lang;

        this.datepickerData.values = datepickerValues;
        this.datepickerData.lang = datepickerLang;
    }

    sendTextFieldValue = (input, value) => {
        let inputValue;
        let inputTitle;
        let submitValue;

        if (value.length) {
            inputValue = value ? value.reduce((acc, item) => `${acc}${moment(item).locale(this.datepickerData.lang).format('D MMM').slice(0, -1)} - `, '').slice(0, -2) : '';
            inputTitle = value ? value.reduce((acc, item) => `${acc}${moment(item).locale(this.datepickerData.lang).format('LL')} - `, '').slice(0, -2) : '';
            submitValue = value ? value : '';
        }

        else {
            inputValue = value ? moment(value).format('DD.MM.YYYY') : '';
            inputTitle = value ? capitalize(moment(value).locale(this.datepickerData.lang).format('dddd, LL')) : '';
            submitValue = value ? value : '';
        }

        input.dispatchEvent(new CustomEvent('text-field-value-sent', {
            detail: {
                value: inputValue,
                title: inputTitle,
                submitValue: submitValue
            }
        }))
    };

    setClearButtonDisabledState() {
        const values = this.datepickerData.values;
        const isDisabled = values ? values.reduce((isDisabled, value) => value ? isDisabled = false : isDisabled , true) : true;

        this.clearButton.disabled = isDisabled;
    }

    handleApplyValue = (event) => {
        if (event.target === this.clearButton) {
            this.datepicker.dispatchEvent(new CustomEvent('clear-datepicker'));
            this.datepickerData.values = ['', ''];
        }
        
        if (this.isTwin) {
            this.textField.forEach((item, index) => this.sendTextFieldValue(item, this.datepickerData.values[index]))
        } 
        else {
            this.sendTextFieldValue(this.textField, this.datepickerData.values);
        }

        this.setClearButtonDisabledState();
    }

    setManualApplyMode() {
        this.datepicker.addEventListener('datepicker-data-sent', this.getDatepickerData);

        this.clearButton = this.root.querySelector('.js-date-dropdown__clear-button');
        this.applyButton = this.root.querySelector('.js-date-dropdown__apply-button');

        this.clearButton.addEventListener('click', this.handleApplyValue);
        this.applyButton.addEventListener('click', this.handleApplyValue);

        new this.Datepicker(this.datepicker);
        
        this.setClearButtonDisabledState();

        if (this.isTwin) {
            this.textField.forEach((item, index) => this.sendTextFieldValue(item, this.datepickerData.values[index]))
        } 
        else {
            this.sendTextFieldValue(this.textField, this.datepickerData.values);
        }
    }

    setAutoApplyMode() {
        this.datepicker.addEventListener('datepicker-data-sent', (event) => {
            this.getDatepickerData(event);

            if (this.isTwin) {
                this.textField.forEach((item, index) => this.sendTextFieldValue(item, this.datepickerData.values[index]))
            } 
            else {
                this.sendTextFieldValue(this.textField, this.datepickerData.values);
            }
        });

        new this.Datepicker(this.datepicker);
    }
    

    init() {
        if (this.isTwin) {
            this.textField = this.root.querySelectorAll('.js-date-dropdown__text-field');
            this.button = this.root.querySelectorAll('.js-date-dropdown__button');

            new this.Expander(this.root, this.button[0], 'date-dropdown_expanded');
            
            this.button[1].addEventListener('click', (event) => {
                this.button[0].click();
            })
        }

        else {
            this.textField = this.root.querySelector('.js-date-dropdown__text-field');
            this.button = this.root.querySelector('.js-date-dropdown__button');

            new this.Expander(this.root, this.button, 'date-dropdown_expanded');
        }

        this.autoApply ? this.setAutoApplyMode() : this.setManualApplyMode();
    }
};

render('.js-date-dropdown', DateDropdown, Expander, Datepicker);