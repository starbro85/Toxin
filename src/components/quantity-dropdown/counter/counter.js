import './counter.css';

export class Counter {
    constructor(node) {
        this.root = node;
        this.decrement = this.root.querySelector('.js-counter__control_decrement');
        this.increment = this.root.querySelector('.js-counter__control_increment');
        this.input = this.root.querySelector('.js-counter__input');
        this.value = Number(this.input.value);
        this.minValue = Number(this.input.getAttribute('aria-valuemin'));
        this.maxValue = Number(this.input.getAttribute('aria-valuemax'));

        this._init();
    }

    _normalizeRange() {
        this.increment.disabled = this.value >= this.maxValue;
        this.decrement.disabled = this.value <= this.minValue;
    }

    _sendCounterData = () => {
        const name = this.input.name;
        const value = Number(this.input.value);
        const plural = JSON.parse(this.input.dataset.plural);
        const isBound = this.input.hasAttribute('data-is-bound');
        const boundName = isBound ? this.input.dataset.boundName : '';
        const boundPlural = isBound ? JSON.parse(this.input.dataset.boundPlural) : '';

        this.root.dispatchEvent(new CustomEvent('counter-changed', {
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

    _handleCounterChange = (event) => {
        if (event.target === this.increment) {
            this.value = this.value + 1;
            this.input.focus();
        }

        if (event.target === this.decrement) {
            this.value = this.value - 1;
            this.input.focus();
        }

        if (event.code === 'ArrowUp') {
            event.preventDefault();
            this.value < this.maxValue ? this.increment.click() : false;
        }

        if (event.code === 'ArrowDown') {                    
            event.preventDefault();
            this.value > this.minValue ? this.decrement.click() : false;
        }
            
        this.input.value = this.value;
        
        this.input.setAttribute('aria-valuenow', this.input.value);

        this._sendCounterData();
        this._normalizeRange();
    }

    _init() {
        this._normalizeRange();
        this._sendCounterData();
        
        this.root.addEventListener('counter-clear', (event) => {
            this.value = 0;
            this.input.value = this.value;

            this._sendCounterData();
            this._normalizeRange();
        })
        this.increment.addEventListener('click', this._handleCounterChange);   
        this.decrement.addEventListener('click', this._handleCounterChange);
        this.input.addEventListener('keydown', this._handleCounterChange);
        this.input.addEventListener('input', this._handleCounterChange);
    }
};