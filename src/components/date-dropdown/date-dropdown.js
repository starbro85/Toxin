import { Datepicker } from './datepicker/datepicker.js';
import { TextField } from '../text-field/text-field.js';
import { Expander } from '../../globals/helpers/expander.js';

class DateDropdown {
    constructor(node, options={}) { 
        if (node) {
            this.root = node;
            this.datepicker = this.root.querySelector('.js-datepicker');
            this.lang = this.root.dataset.lang;
            this.isTwin = this.root.hasAttribute('data-is-twin');
            this.autoApply = this.root.hasAttribute('data-auto-apply');
            this.options = options;

            this._init();
        }
    }

    _setDateAutoUpdate() {
        this.datepicker.addEventListener('datepicker-date-sent', (event) => {
            this.dates = event.detail.dates ? event.detail.dates.map((date) => new Date(date).getTime()) : '';
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

    /* twin mode methods */

    _setTwinTextFieldPlaceholder() {
        this.textFields.forEach((textField, index) => {
            const placeholder = this.dates ? this._getFormattedDates(this.dates, { day: '2-digit', month: '2-digit', year: 'numeric' })[index] : '';

            new TextField(textField).setPlaceholder(placeholder);
        });
    }

    _setTwinTextFieldTitle() {
        this.textFields.forEach((textField, index) => {
            const title = this.dates ? this._getFormattedDates(this.dates, { day: 'numeric', month: 'long', year: 'numeric' })[index] : '';

            new TextField(textField).setTitle(title);
        });
    }

    _setTwinTextFieldValue() {
        this.textFields.forEach((textField, index) => {
            const value = this.dates ? new Date(this.dates[index]).toISOString() : '';

            new TextField(textField).setValue(value);
        });
    }

    _updateTwinTextField() {
        this._setTwinTextFieldValue();
        this._setTwinTextFieldPlaceholder();
        this._setTwinTextFieldTitle();
    }

    _setTwinMode() {
        this.textFields = this.root.querySelectorAll('.js-date-dropdown__text-field');
        this.buttons = this.root.querySelectorAll('.js-date-dropdown__button');
        this._updateTextField = this._updateTwinTextField;
    }

    /* single mode methods */

    _setSingleTextFieldPlaceholder() {
        const placeholder = this.dates ? this._getFormattedDateRange(this.dates, { day: 'numeric', month: 'short' }) : '';

        new TextField(this.textField).setPlaceholder(placeholder);
    }

    _setSingleTextFieldTitle() {
        const title = this.dates ? this._getFormattedDateRange(this.dates, { day: 'numeric', month: 'long' }) : '';

        new TextField(this.textField).setTitle(title);
    }

    _setSingleTextFieldValue() {
        const value = this.dates ? `"${[new Date(this.dates[0]).toISOString(), new Date(this.dates[1]).toISOString()]}"` : '';

        new TextField(this.textField).setValue(value);
    }

    _updateSingleTextField() {
        this._setSingleTextFieldValue();
        this._setSingleTextFieldPlaceholder();
        this._setSingleTextFieldTitle();
    }

    _setSingleMode() {
        this.textField = this.root.querySelector('.js-date-dropdown__text-field');
        this.button = this.root.querySelector('.js-date-dropdown__button');
        this._updateTextField = this._updateSingleTextField;
    }

    /* components initialization methods */

    _setExpander() {
        new Expander(this.root, {
            control: this.isTwin ? this.buttons : this.button,
            multiple: this.isTwin,
            toggleClass: 'date-dropdown_expanded', 
            trapFocus: true,
            outsideClickCollapse: true
        });
    }

    _setDatepicker() {
        new Datepicker(this.datepicker);
    }

    /* */

    _addChangedEvent = () => {
        this.root.dispatchEvent(new CustomEvent('date-dropdown-changed', {
            bubbles: true,
            detail: {
                dates: this.dates
            }
        }))
    }

    /* auto apply methods */

    _setAutoApply() {
        this.datepicker.addEventListener('datepicker-date-sent', (event) => {
            this._updateTextField();
            this._addChangedEvent();
        });
    }

    /* manual apply methods */

    _addDatepickerClearEvent() {
        this.datepicker.dispatchEvent(new CustomEvent('datepicker-clear'));
    }

    _setClearButtonDisabledState = () => this.clearButton.disabled = this.dates ? false : true;

    _handleManualApply = (event) => {
        if (event.target === this.clearButton) {
            this.dates = '';

            this._addDatepickerClearEvent();
        }

        this._updateTextField();
        this._addChangedEvent();
        this._setClearButtonDisabledState();
    }

    _setManualApply() {
        this.applyButton = this.root.querySelector('.js-date-dropdown__apply-button');
        this.clearButton = this.root.querySelector('.js-date-dropdown__clear-button');

        this.applyButton.addEventListener('click', this._handleManualApply);
        this.clearButton.addEventListener('click', this._handleManualApply);

        document.addEventListener('DOMContentLoaded', this._addChangedEvent);
        this._setClearButtonDisabledState();
    }

    _setViewMode = () => this.isTwin ? this._setTwinMode() : this._setSingleMode();

    _setApplyMode = () => this.autoApply ? this._setAutoApply() : this._setManualApply();
      
    _init() {
        this._setDateAutoUpdate();
        this._setViewMode();
        this._setDatepicker();
        this._setApplyMode();
        this._updateTextField();
        this._setExpander();
    }
}

export default function render () {
    const components = document.querySelectorAll('.js-date-dropdown');

    if (components.length > 0) {
        components.forEach((node) => new DateDropdown(node));
    };
}