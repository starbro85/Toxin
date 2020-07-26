import './quantity-dropdown.css';
import './counter/counter.css';

import './../text-field/text-field.js';

import { Counter } from './counter/counter.js';
import { Expander } from '../../globals/helpers/expander';

const normalizeStr = require('./../../globals/helpers/normalizeStr.js');
const pluralize = require('./../../globals/helpers/pluralize.js');
const render = require('./../../globals/helpers/render.js');

class QuantityDropdown {
    constructor(node, Counter, Expander) {
        this.root = node;
        this.textField = this.root.querySelector('.js-quantity-dropdown__text-field');
        this.button = this.root.querySelector('.js-quantity-dropdown__button')
        this.counters = this.root.querySelectorAll('.js-counter');
        this.inputs = this.root.querySelectorAll('.js-counter__input');

        this.autoApply = this.root.hasAttribute('data-auto-apply');
        this.countersData = {};

        this.Counter = Counter;
        this.Expander = Expander;

        this.init();
    }
      
    getCountersData = () => {
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
                    isBound: isBound,
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
                isBound: isBound
            }
        }
    }

    getInputSizeInChar() {
        const style = getComputedStyle(this.textField);
        const inputWidth = parseInt(style.width) - 35;
        const inputSizeInChar = Math.floor(inputWidth * 0.125);

        return inputSizeInChar;
    }
    
    getInputValue() {
        const counters = Object.values(this.countersData);
        const inputValue = counters
            .reduce((inputValue, counter) => (counter.value !== 0) ? `${inputValue}${pluralize(counter.plural, counter.value)}, ` : `${inputValue}`, '')
            .slice(0, -2);

        return inputValue;
    }

    getSubmitValue() {
        const counters = Object.values(this.countersData);
        const submitValue = counters
            .reduce((submitValue, counter) => counter.value ? `${submitValue}"${counter.name}": "${counter.value}", ` : `${submitValue}`, '')
            .slice(0, -2);

        return submitValue ? `{${submitValue}}` : '';
    }

    sendTextFieldValue = () => {
        const inputValue = normalizeStr({
                                        str: this.getInputValue(),
                                        size: this.getInputSizeInChar()
                                    });
        const title = this.getInputValue();
        const hiddenInputValue = this.getSubmitValue();

        this.textField.dispatchEvent(new CustomEvent('text-field-value-sent', {
            detail: {
                value: inputValue,
                title: title,
                submitValue: hiddenInputValue
            }
        }));
    };

    setClearButtonDisabledState() {
        const counters = Object.values(this.countersData);
        const isDisabled = counters.reduce((isDisabled, data) => data.value > 0 ? isDisabled = false : isDisabled , true);

        this.clearButton.disabled = isDisabled;
    }

    handleApplyValue = (event) => {
        if (event.target === this.clearButton) {
            this.counters.forEach(counter => counter.dispatchEvent(new CustomEvent('counter-value-clear')));

            this.sendTextFieldValue(); 
        }

        if (event.target === this.applyButton) {
            this.sendTextFieldValue();    
        }

        this.setClearButtonDisabledState();
    }

    setManualApplyMode() {
        this.clearButton = this.root.querySelector('.js-quantity-dropdown__clear-button');
        this.applyButton = this.root.querySelector('.js-quantity-dropdown__apply-button');

        this.clearButton.addEventListener('click', this.handleApplyValue);
        this.applyButton.addEventListener('click', this.handleApplyValue);

        this.setClearButtonDisabledState();
    }

    setAutoApplyMode() {
        this.counters.forEach(counter => counter.addEventListener('counter-data-sent', this.sendTextFieldValue));
    }
    
    init() {
        this.counters.forEach(counter => counter.addEventListener('counter-data-sent', this.getCountersData));

        new this.Expander(this.root, this.button, {
            toggleClass: 'quantity-dropdown_expanded',
            trapFocus: true,
            outsideClickCollapse: true
        });
        this.counters.forEach((counter) => new this.Counter(counter));

        this.sendTextFieldValue();

        if (this.autoApply) {
            this.setAutoApplyMode();
        }

        else {
            this.setManualApplyMode();
        }
    }
};

render('.js-quantity-dropdown', QuantityDropdown, Counter, Expander);