import './quantity-dropdown.css';
import './counter/counter.css';

import './../text-field/text-field.js';

import { Counter } from './counter/counter.js';

const normalizeStr = require('./../../globals/helpers/normalizeStr.js');
const pluralize = require('./../../globals/helpers/pluralize.js');
const render = require('./../../globals/helpers/render.js');

class Dropdown {
    constructor(node) {
        this.root = node;
        this.button = this.root.querySelector('.js-quantity-dropdown__button');
        this.container = this.root.querySelector('.js-quantity-dropdown__container');
        this.focusableElements = this.container.querySelectorAll('button:not(:disabled):not([tabindex="-1"]), input:not(:disabled):not([tabindex="-1"])');
        this.firstFocusableElement = this.focusableElements[0];
        this.lastFocusableElement = this.focusableElements[this.focusableElements.length - 1];

        this.expanded = JSON.parse(this.button.getAttribute('aria-expanded'));

        this.init();
    }

    handleCollapse = (event) => { 
        if (event.key === 'Escape') {
            this.toggleExpand();
            this.button.focus();
        }

        if (!this.root.contains(event.target)) {
            this.toggleExpand();
        }
    }

    toggleExpand = () => {
        this.expanded = !(this.expanded);
        this.button.setAttribute('aria-expanded', this.expanded);
        this.root.classList.toggle('quantity-dropdown_expanded');
        this.expanded ? document.addEventListener('click', this.handleCollapse) : document.removeEventListener('click', this.handleCollapse);
        this.focusableElements.forEach(element => this.expanded ? element.addEventListener('keyup', this.handleCollapse) : element.removeEventListener('keyup', this.handleCollapse));
        this.lastFocusableElement.addEventListener('blur', () => this.expanded ? this.firstFocusableElement.focus() : this.firstFocusableElement.focus());
    };

    init() {
        this.button.addEventListener('click', this.toggleExpand);
    }
};

class Quantity {
    constructor(node) {
        this.root = node;
        this.textField = this.root.querySelector('.js-quantity-dropdown__text-field');
        this.counters = this.root.querySelectorAll('.js-counter');

        this.autoApply = Boolean(this.root.dataset.autoApply);
        this.countersData = {};

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
        const inputWidth = parseInt(style.width);
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

    sendInputValue = () => {
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

            this.sendInputValue(); 
        }

        if (event.target === this.applyButton) {
            this.sendInputValue();    
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
        this.counters.forEach(counter => counter.addEventListener('counter-data-sent', this.sendInputValue));
    }

    setCountersDataSentEventListener() {
        this.counters.forEach(counter => counter.addEventListener('counter-data-sent', this.getCountersData));
    } 

    init() {
        this.setCountersDataSentEventListener();

        if (this.autoApply) {
            this.setAutoApplyMode();
        }

        else {
            this.setManualApplyMode();
        }
    }
};

render('.js-counter', Counter);
render('.js-quantity-dropdown', Dropdown);
render('.js-quantity-dropdown', Quantity);