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
        const counterValues = Object.values(this.counterData);
        const inputValue = counterValues.reduce((acc, data) => (data.value !== 0) ? `${acc} ${pluralize(data.plural, data.value)},` : `${acc}`, '');

        return inputValue.slice(1, -1);
    }

    getSubmitValue() {
        const counterValues = Object.values(this.counterData);
        const submitValue = counterValues.reduce((acc, data) => data.value ? `${acc} ${data.name}: "${data.value}",` : `${acc}`, '');

        return submitValue ? `{${submitValue.slice(1, -1)}}` : '';
    }

    addUpdateInputValueEvent() {
        const inputValue = this.getInputValue();
        const inputValueNormalized = normalizeStr({
                                        str: this.getInputValue(),
                                        size: this.getInputSizeInChar()
                                    });
        const hiddenInputValue = this.getSubmitValue();

        this.input.dispatchEvent(new CustomEvent('update-input-value', {
            detail: {
                inputValue: inputValueNormalized,
                inputTitle: inputValue,
                hiddenInputValue: hiddenInputValue
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