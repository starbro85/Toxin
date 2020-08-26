import './quantity-dropdown.css';
import './counter/counter.css';

import '../text-field/text-field.js';

import { Counter } from './counter/counter.js';
import { TextField } from '../text-field/text-field.js';
import { Expander } from '../../globals/helpers/expander';

const normalizeStr = require('./../../globals/helpers/normalizeStr.js');
const pluralize = require('./../../globals/helpers/pluralize.js');

export class QuantityDropdown {
    constructor(node) {
        if (node) {
            this.root = node;
            this.textField = this.root.querySelector('.js-quantity-dropdown__text-field');
            this.button = this.root.querySelector('.js-quantity-dropdown__button')
            this.counters = this.root.querySelectorAll('.js-counter');
            this.inputs = this.root.querySelectorAll('.js-counter__input');
            this.autoApply = this.root.hasAttribute('data-auto-apply');
            this.lang = this.root.dataset.lang;
            this.countersData = {};
        }
    }
      
    _setCoutersDataAutoUpdate = () => {
        this.counters.forEach(counter => counter.addEventListener('counter-changed', (event) => {
            const name = event.detail.name;
            const value = event.detail.value;
            const plural = event.detail.plural;
            const isBound = event.detail.isBound;
            const boundplural = event.detail.boundPlural;
            const boundName = event.detail.boundName;

            if (isBound) {
                if (!this.countersData[boundName])
                    this.countersData[boundName] = {
                        name: boundName,
                        isBound: true,
                        plural: boundplural,
                        originData: {}
                    }
                this.countersData[boundName].originData[name] = { name: name };
                this.countersData[boundName].originData[name].plural = plural;
                this.countersData[boundName].originData[name].value = value;
                this.countersData[boundName].value = Object.values(this.countersData[boundName].originData)
                                                        .reduce((sumValue, data) => sumValue + data.value, 0);
            }

            else {
                this.countersData[name] = {
                    name: name,
                    plural: plural,
                    value: value,
                    isBound: false
                }
            }
        })); 
    }

    _getInputSizeInChar() {
        const style = getComputedStyle(this.textField);
        const inputWidth = parseInt(style.width) - 35;
        const inputSizeInChar = Math.floor(inputWidth * 0.125);

        return inputSizeInChar;
    }
    
    _getInputValue() {
        const counters = Object.values(this.countersData);
        const inputValue = counters
            .reduce((inputValue, counter) => (counter.value !== 0) ? `${inputValue} ${counter.value} ${pluralize(this.lang, counter.plural, counter.value)}, ` : `${inputValue}`, '')
            .slice(1, -2);

        return inputValue;
    }

    _getSubmitValue() {
        const counters = Object.values(this.countersData);
        const submitValue = counters
            .reduce((submitValue, counter) => counter.value ? `${submitValue}"${counter.name}": "${counter.value}", ` : `${submitValue}`, '')
            .slice(0, -2);

        return submitValue ? `{${submitValue}}` : '';
    }

    _setTextFieldValues() {
        new TextField(this.textField).setValue(normalizeStr(this._getInputValue(), this._getInputSizeInChar()));

        new TextField(this.textField).setTitle(this._getInputValue());

        new TextField(this.textField).setSubmitValue(this._getSubmitValue());
    }

    _setAutoApply() {

    }

    _setManualApply() {
        this.applyButton = this.root.querySelector('.js-quantity-dropdown__apply-button');
        this.clearButton = this.root.querySelector('.js-quantity-dropdown__clear-button');
        
        const setClearButtonDisabledState = () => {
            const counters = Object.values(this.countersData);
            const isDisabled = counters.reduce((acc, counter) => { 
                if (counter.value) {
                    acc = false;
                }; 

                return acc;
            }, true);

            this.clearButton.disabled = isDisabled;
        }

        this.applyButton.addEventListener('click', (event) => {
            this._setTextFieldValues();

            setClearButtonDisabledState();
        });

        this.clearButton.addEventListener('click', (event) => {
            this.counters.forEach((counter) => counter.dispatchEvent(new CustomEvent('counter-clear')));

            this._setTextFieldValues();

            setClearButtonDisabledState();
        });

        setClearButtonDisabledState();
    }

    _setAutoApply() {
        this.counters.forEach((counter) => counter.addEventListener('counter-changed', (event) => this._setTextFieldValues()));
    }
    
    _init() {
        this._setCoutersDataAutoUpdate();

        this.counters.forEach((counter) => new Counter(counter));

        new Expander(this.root, {
            control: this.button,
            toggleClass: 'quantity-dropdown_expanded', 
            trapFocus: true,
            outsideClickCollapse: true
        });

        this.autoApply ? this._setAutoApply() : this._setManualApply();

        this._setTextFieldValues();
    }

    render(parent) {
        const components = parent ? parent.querySelectorAll('.js-quantity-dropdown') : document.querySelectorAll('.js-quantity-dropdown');

        if (components.length > 0) {
            Array.from(components).map((node) => new QuantityDropdown(node)._init());
        };
    }
}

