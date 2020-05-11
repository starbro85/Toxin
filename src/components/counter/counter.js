import './counter.css';

class Counter {
    constructor(node) {
        this.root = node;
        this.increment = this.root.querySelector('.js-counter__increment');
        this.decrement = this.root.querySelector('.js-counter__decrement');
        this.input = this.root.querySelector('.js-counter__input');
        this.value = Number(this.input.value);
        this.defaultValue = Number(this.root.dataset.defaultValue);
        this.minValue = Number(this.root.dataset.minValue);
        this.maxValue = Number(this.root.dataset.maxValue);

        this.init();
    }

    normalizeRange() {
        this.increment.disabled = this.value >= this.maxValue;
        this.decrement.disabled = this.value <= this.minValue;
    }

    handleCountChange = event => {
        if (Object.is(event.target, this.increment)) {
            this.value = this.value + 1;
        }

        if (Object.is(event.target, this.decrement)) {
            this.value = this.value - 1;
        }

        this.input.value = this.value;

        const trigger = new Event('value-changed');
        this.root.dispatchEvent(trigger);
        
        this.normalizeRange();
    }

    init() {
        this.input.value = this.defaultValue;
        this.normalizeRange();
        this.increment.onclick = this.handleCountChange;   
        this.decrement.onclick = this.handleCountChange;
    }
};

function render() {
    const components = document.querySelectorAll('.js-counter');
    if (components.length > 0) {
        Array.from(components).map((node) => new Counter(node));
    };
};

render();
