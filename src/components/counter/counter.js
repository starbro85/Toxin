import './counter.css';

import './../button/button.js';

const pluralize = require('./../../globals/helpers/pluralize.js');

class Counter {
    constructor(node) {
        this.root = node;
        this.increment = this.root.querySelector('.js-counter__increment');
        this.decrement = this.root.querySelector('.js-counter__decrement');
        this.input = this.root.querySelector('.js-counter__input');
        this.value = Number(this.root.dataset.defaultValue);
        this.minValue = Number(this.root.dataset.minValue);
        this.maxValue = Number(this.root.dataset.maxValue);
        this.plural = JSON.parse(this.root.dataset.plural);

        this.init();
    }

    normalizeRange() {
        this.increment.disabled = this.value >= this.maxValue;
        this.decrement.disabled = this.value <= this.minValue;
    }

    addCounterChangeEvent() {
        this.root.dispatchEvent(new CustomEvent('counter-changed', {
            detail: {
                name: this.input.name,
                value: Number(this.input.value),
                plural: this.plural,
                isBound: JSON.parse(this.root.dataset.isBound),
                boundPlural: JSON.parse(this.root.dataset.boundPlural),
                boundName: this.root.dataset.boundName
            }
        }));

        this.addAriaLabelToControls();
    }

    addAriaLabelToControls() {
        this.increment.setAttribute('aria-label', `${pluralize(this.plural, this.value)} - увеличить`);
        this.decrement.setAttribute('aria-label', `${pluralize(this.plural, this.value)} - уменьшить`);
    }

    handleCountChange = event => {
        if (Object.is(event.target, this.increment)) {
            this.value = this.value + 1;
        }

        if (Object.is(event.target, this.decrement)) {
            this.value = this.value - 1;
        }

        this.input.value = this.value;
        this.addCounterChangeEvent();
        this.normalizeRange();
    }

    setCounterClearEventListener() {
        this.root.addEventListener('counter-clear', event => {
            this.value = 0
            this.input.value = this.value;
            this.addCounterChangeEvent();
            this.normalizeRange()
        })
    }

    setCounterChangeEventListeners() {
        window.addEventListener('load', event => {   
            this.addAriaLabelToControls();
            this.addCounterChangeEvent()
        });
        this.increment.addEventListener('click', this.handleCountChange);   
        this.decrement.addEventListener('click', this.handleCountChange);
    }

    init() {
        this.input.value = this.value;

        this.normalizeRange();
        this.setCounterChangeEventListeners();
        this.setCounterClearEventListener();
    }
};

function render() {
    const components = document.querySelectorAll('.js-counter');
    if (components.length > 0) {
        Array.from(components).map((node) => new Counter(node));
    };
};

render();
