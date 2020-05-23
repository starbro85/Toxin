import './../counter-bar/counter-bar.js';
import './../dropdown/dropdown.js';

class Quantity {
    constructor(node) {
        this.root = node;
        this.input = this.root.querySelector('.js-text-field__input');
        this.countersBar = this.root.querySelector('.js-counter-bar');
        this.defaultValue = this.input.value;
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
        const inputValue = counterValues.reduce((acc, data) => {
            if (data.value !== 0) {
                return `${acc} ${formatValue(data.plural, data.value)},`;
            } 
            else {
                return `${acc}`;
            } 
        }, '');

        return inputValue.substring(0, inputValue.length -1);
    }

    getInputValueNormalized() {
        const counterValues = Object.values(this.counterData);
        let addEllipsis = false;
        const inputSize = this.getInputSizeInChar();
        const inputValueNoramlized = counterValues.reduce((acc, data) => {
            if (data.value !== 0) {
                if (`${acc} ${formatValue(data.plural, data.value)},`.length < inputSize) {
                    return `${acc} ${formatValue(data.plural, data.value)},`;
                }
                else {
                    addEllipsis = true;
                    return `${acc}`;
                }
            } 
            else {
                return `${acc}`;
            } 
        }, '');

        if (addEllipsis) {
            return `${inputValueNoramlized.substr(0, inputValueNoramlized.length - 1)}…`
        }
        else {
            return inputValueNoramlized.substr(0, inputValueNoramlized.length - 1);
        }
    }

    updateInputValue() {
        const inputValue = this.getInputValue();
        const inputValueNormalized = this.getInputValueNormalized();

        if (inputValueNormalized) {
            this.input.value = inputValueNormalized;
        }
        else {
            this.input.value = this.defaultValue;
        }

        if (inputValue) {
            this.input.title = inputValue;
        }
        else {
            this.input.value = this.defaultValue;
        }
    }

    handleDataSentEvent = event => {
        this.counterData = event.detail.counterData;
        this.updateInputValue();
    }

    setDataSentEventListener() {
        this.countersBar.addEventListener('data-sent', this.handleDataSentEvent);
    }

    init() {
        this.setDataSentEventListener();
    }
};

function formatValue(plural, count) {
    if (count === 1) return `${count} ${plural.one}`;
    if (count > 1 && count < 5) return `${count} ${plural.few}`;
    if (count >= 5) return `${count} ${plural.many}`;
};

function render() {
    const components = document.body.querySelectorAll('.js-quantity-dropdown');
    if (components.length > 0) {
        Array.from(components).map((node) => new Quantity(node));
    };
};

render();