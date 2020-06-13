import './quantity-dropdown.css';

import './../counter-bar/counter-bar.js';
import './../dropdown/dropdown.js';

const normalizeStr = require('./../../globals/helpers/normalizeStr.js');
const pluralize = require('./../../globals/helpers/pluralize.js');

class Quantity {
    constructor(node) {
        this.root = node;
        this.input = this.root.querySelector('.js-quantity-dropdown__input');
        this.countersBar = this.root.querySelector('.js-quantity-dropdown__counter-bar');
        this.counterData = {};

        this.init();
    }

    getInputSizeInChar() {
        const style = getComputedStyle(this.input);
        const inputWidth = parseInt(style.width);
        const inputSizeInChar = Math.floor(inputWidth * 0.125);

        return inputSizeInChar;
    }
    
    getInputValue() {
        const counters = Object.values(this.counterData);
        return counters.reduce((inputValue, counter) => (counter.value !== 0) ? `${inputValue}${pluralize(counter.plural, counter.value)}, ` : `${inputValue}`, '')
                            .slice(0, -2);
    }

    getInputTitle() {
        const counters = Object.values(this.counterData);

        return counters.reduce((inputTitle, counter) => {
            if (counter.isBound) {
                for (let name in counter.values) {
                    inputTitle = (counter.values[name] !== 0) ? `${inputTitle}${pluralize(counter.plurals[name], counter.values[name])}, ` : `${inputTitle}`;
                }       
                return inputTitle; 
            }
            else {
                return (counter.value !== 0) ? `${inputTitle}${pluralize(counter.plural, counter.value)}, ` : `${inputTitle}`;
            }
        }, '').slice(0, -2);
    }

    getSubmitValue() {
        const counters = Object.values(this.counterData);
        const submitValue = counters.reduce((submitValue, counter) => counter.value ? `${submitValue}"${counter.name}": "${counter.value}", ` : `${submitValue}`, '').slice(0, -2);

        return submitValue ? `{${submitValue}}` : '';
    }

    addUpdateInputValueEvent() {
        const inputValueNormalized = normalizeStr({
                                        str: this.getInputValue(),
                                        size: this.getInputSizeInChar()
                                    });
        const inputTitle = this.getInputTitle();
        const hiddenInputValue = this.getSubmitValue();

        this.input.dispatchEvent(new CustomEvent('update-input-value', {
            detail: {
                value: inputValueNormalized,
                title: inputTitle,
                submitValue: hiddenInputValue
            }
        }));
    }

    handleDataSentEvent = event => {
        this.counterData = event.detail.counterData;

        this.addUpdateInputValueEvent();
    }

    setDataSentEventListener() {
        this.countersBar.addEventListener('data-sent', this.handleDataSentEvent);
    }

    init() {
        this.setDataSentEventListener();
    }
};

function render() {
    const components = document.body.querySelectorAll('.js-quantity-dropdown');
    if (components.length > 0) {
        Array.from(components).map((node) => new Quantity(node));
    };
};

render();