import './../counter/counter.js';
import './../dropdown/dropdown.js';
import './quantity-dropdown.css';

class Quantity {
    constructor(node) {
        this.root = node;
        this.viewInput = this.root.querySelector('.js-text-field__input');
        this.submitInput = this.root.querySelector('.js-quantity-dropdown__submit-input');
        this.button = this.root.querySelector('.js-dropdown__button');
        this.counters = this.root.querySelectorAll('.js-counter');
        this.counterData = this.getCounterData();

        this.init();
    }

    getCounterData = () => Array.from(this.counters).reduce((counterData, counter) => {
        const counterName = counter.dataset.name;
        const counterPlural = counter.dataset.plural;
        const counterValue = counter.dataset.defaultValue;

        counterData[counterName] = {
            name: counterName,
            plural: JSON.parse(counterPlural),
            value: Number(counterValue),
        };
        return counterData;
    }, {});


    updateSubmitValue() {   
        const counterValues = Object.values(this.counterData);
        const inputValue = counterValues.reduce((acc, data) => `${acc} ${data.name}: ${data.value},`,'');
        this.submitInput.value = inputValue;
    }

    updateViewValue() {
        const counterValues = Object.values(this.counterData);
        const inputValue = counterValues.reduce((acc, data) => (data.value !== 0) ? `${acc} ${formatValue(data.plural, data.value)},` : `${acc}`, '');

        this.viewInput.value = inputValue.substr(0, inputValue.length - 1);
        this.button.title = inputValue.substr(0, inputValue.length - 1);
    }

    setCounterValueChangeEventListener() {
        Array.from(this.counters).forEach((counter) => counter.addEventListener('counterValueChange', (event) => {
            const counterName = counter.dataset.name;
            this.counterData[counterName].value = event.detail.value;
            this.updateViewValue();
            this.updateSubmitValue();
        }));
    }

    init() {
        this.updateViewValue();
        this.updateSubmitValue();
        this.setCounterValueChangeEventListener();
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