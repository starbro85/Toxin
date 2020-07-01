import './counter.css';

class Counter {
    constructor(node) {
        this.root = node;
        this.decrement = this.root.querySelector('.js-counter__decrement');
        this.increment = this.root.querySelector('.js-counter__increment');
        this.input = this.root.querySelector('.js-counter__input');
        this.value = Number(this.input.value);
        this.minValue = Number(this.input.getAttribute('aria-valuemin'));
        this.maxValue = Number(this.input.getAttribute('aria-valuemax'));

        this.init();
    }

    normalizeRange() {
        this.increment.disabled = this.value >= this.maxValue;
        this.decrement.disabled = this.value <= this.minValue;
    }

    sendCounterData = () => {
        const name = this.input.name;
        const value = Number(this.input.value);
        const plural = JSON.parse(this.input.dataset.plural);
        const isBound = Boolean(this.input.dataset.isBound);
        const boundName = isBound ? this.input.dataset.boundName : '';
        const boundPlural = isBound ? JSON.parse(this.input.dataset.boundPlural) : '';

        this.root.dispatchEvent(new CustomEvent('counter-data-sent', {
            detail: {
                name: name,
                value: value,
                plural: plural,
                isBound: isBound,
                boundName: boundName,
                boundPlural: boundPlural   
            }
        }));
    }

    handleCounterChange = (event) => {
        if (event.target === this.increment) {
            this.value = this.value + 1;
            this.input.focus();
        }

        if (event.target === this.decrement) {
            this.value = this.value - 1;
            this.input.focus();
        }

        if (event.key === 'ArrowUp') {
            this.value < this.maxValue ? this.increment.click() : false;
        }

        if (event.key === 'ArrowDown') {
            this.value > this.minValue ? this.decrement.click() : false;
        }

        if (event.type === 'input') {
            this.value = this.input.value;
        }

        else {
            this.input.value = this.value;
        }
        
        this.input.setAttribute('aria-valuenow', this.value);

        this.sendCounterData();
        this.normalizeRange();
    }

    handleCounterClear = () => {
        this.value = 0;
        this.input.value = this.value;

        this.sendCounterData();
        this.normalizeRange();
    }

    preventScroll() {
        if ((event.key === 'ArrowDown') || (event.key === 'ArrowUp')) {
            event.preventDefault();
        }
    }

    init() {
        this.normalizeRange();

        window.addEventListener('load', this.sendCounterData);
        this.root.addEventListener('counter-value-clear', this.handleCounterClear)
        this.increment.addEventListener('click', this.handleCounterChange);   
        this.decrement.addEventListener('click', this.handleCounterChange);
        this.input.addEventListener('keyup', this.handleCounterChange);
        this.input.addEventListener('keydown', this.preventScroll);
        this.input.addEventListener('input', this.handleCounterChange);
    }
};

export {Counter};