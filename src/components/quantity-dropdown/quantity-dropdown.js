import './../counters-bar/counters-bar.js';
import './../dropdown/dropdown.js';

class Quantity {
    constructor(node) {
        this.root = node;
        this.input = this.root.querySelector('.js-text-field__input');
        this.button = this.root.querySelector('.js-dropdown__button');
        this.countersBar = this.root.querySelectorAll('.js-counters-bar');
        this.counterData = {};

        this.init();
    }

    updateInputValue() {
        const counterValues = Object.values(this.counterData);
        const inputSize = Math.floor(parseInt(this.input.getComputetStyle().width) / 0.125);

        const inputValue = counterValues.reduce((acc, data) => {
            if (data.value !== 0) 
                if (`${acc} ${formatValue(data.plural, data.value)},`.length > inputSize)
                    return `${acc}`;
                else
                    return `${acc} ${formatValue(data.plural, data.value)},`; 
            else 
                return `${acc}`;
        }, '');

        this.input.value = inputValue.substr(0, inputValue.length - 1);
        this.button.title = inputValue.substr(0, inputValue.length - 1);
    }

    setCounterValueDispatchEventListener() {
        Array.from(this.countersBar).forEach((counter) => counter.addEventListener('counter-value-dispatch', event => {
            this.counterData = event.detail.counterData;
            this.updateInputValue()
        }));  
    }

    init() {
        this.setCounterValueDispatchEventListener();
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