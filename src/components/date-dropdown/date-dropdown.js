import './date-dropdown.css';

import './datepicker/datepicker.js';
import '../text-field/text-field.js';
import '../button/button.js';
 
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

        this.textFieldData = {};

        this.init(Expander, Datepicker);
    }

    getTextFieldData() {
        this.datepicker.addEventListener('datepicker-data-sent', (event) => {
            const textFieldData = {};
            const dates = event.detail.dates;
            const lang = event.detail.lang;
            
            if (this.isTwin) {
                textFieldData.values = dates ? dates.map((date) => moment(date).format('DD.MM.YYYY'))  : ['', ''];
                textFieldData.titles = dates ? dates.map((date) => capitalize(moment(date).locale(lang).format('dddd, LL'))) : ['', ''];
                textFieldData.submitValues = dates ? dates.map((date) => Number(moment(date).format('x'))) : ['', ''];
            } else {
                textFieldData.value = dates ? dates.reduce((value, date) => `${value}${moment(date).locale(lang).format('D MMM')} - `, '').slice(0, -2) : '';
                textFieldData.title = dates ? dates.reduce((title, date) => `${title}${moment(date).locale(lang).format('LL')} - `, '').slice(0, -2) : '';
                textFieldData.submitValues = dates ? dates.reduce((submitValue, date) => `${submitValue}${Number(moment(date).format('x'))} - `, '').slice(0, -2) : '';
            }

            this.textFieldData = textFieldData;
        });
    }

    sendTextFieldData = () => {
        const textFieldData = this.textFieldData;

        if (this.isTwin) {
            this.textField.forEach((node, index) => node.dispatchEvent(
                new CustomEvent('text-field-value-sent', {
                    detail: {
                        value: textFieldData.values[index],
                        title: textFieldData.titles[index],
                        submitValue: textFieldData.submitValues[index]
                    }
                })
            ));
        } else {
            this.textField.dispatchEvent(
                new CustomEvent('text-field-value-sent', {
                    detail: {
                        value: textFieldData.value,
                        title: textFieldData.title,
                        submitValue: textFieldData.submitValues
                    }
                })
            );
        }
    };

    setClearButtonDisabledState() {
        if (this.isTwin) {
            const values = this.textFieldData.values;
            const isDisabled = values ? values.reduce((isDisabled, value) => value ? isDisabled = false : isDisabled , true) : true;

            this.clearButton.disabled = isDisabled;
        } else {
            const value = this.textFieldData.value;
            const isDisabled = value ?  true : false;

            this.clearButton.disabled = isDisabled;
        }
    }

    handleApplyValue = (event) => {
        if (event.target === this.clearButton) {
            this.datepicker.dispatchEvent(new CustomEvent('clear-datepicker'));

            if (this.isTwin) { 
                this.textFieldData.values = ['', ''];
                this.textFieldData.submitValues = ['', ''];
                this.textFieldData.titles = ['', ''];
            } else { 
                this.textFieldData.value = '';
                this.textFieldData.submitValue = '';
                this.textFieldData.title = '';
            }
        }
        
        this.sendTextFieldData();

        this.setClearButtonDisabledState();

        this.root.dispatchEvent(
            new CustomEvent('date-dropdown-value-apply', {
                detail: {
                    values: this.textFieldData.submitValues
                }
            })
        );
    }

    setAutoApplyMode() { 
        this.datepicker.addEventListener('datepicker-data-sent', (event) => {
            this.sendTextFieldData();

            this.root.dispatchEvent(
                new CustomEvent('date-dropdown-value-apply', {
                    detail: {
                        values: this.textFieldData.submitValues
                    }
                })
            );
        }); 
    }

    setManualApplyMode() {
        if (this.textFieldData.values) {
            this.sendTextFieldData();
        }

        this.clearButton = this.root.querySelector('.js-date-dropdown__clear-button');
        this.applyButton = this.root.querySelector('.js-date-dropdown__apply-button');

        this.clearButton.addEventListener('click', this.handleApplyValue);
        this.applyButton.addEventListener('click', this.handleApplyValue);

        this.setClearButtonDisabledState();

        document.addEventListener('DOMContentLoaded', (event) => {
            this.root.dispatchEvent(
                new CustomEvent('date-dropdown-value-apply', {
                    detail: {
                        values: this.textFieldData.submitValues
                    }
                })
            )
        });
    }
      
    init(Expander, Datepicker) {
        if (this.isTwin) {
            this.buttons = this.root.querySelectorAll('.js-date-dropdown__button');
            this.textField = this.root.querySelectorAll('.js-date-dropdown__text-field');

            new Expander(this.root, {
                control: this.buttons,
                toggleClass: 'date-dropdown_expanded',
                trapFocus: true,
                outsideClickCollapse: true,
                multiple: true
            });
        } else {
            this.button = this.root.querySelector('.js-date-dropdown__button');
            this.textField = this.root.querySelector('.js-date-dropdown__text-field');

            new Expander(this.root, {
                control: this.button,
                toggleClass: 'date-dropdown_expanded',
                trapFocus: true,
                outsideClickCollapse: true
            })
        }

        this.getTextFieldData();

        new Datepicker(this.datepicker);
        
        if (this.autoApply) { 
            this.setAutoApplyMode(); 
        } else { 
            this.setManualApplyMode(); 
        }
    }
};

render('.js-date-dropdown', DateDropdown, Expander, Datepicker);