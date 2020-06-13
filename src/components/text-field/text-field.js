import './text-field.css';

import Cleave from 'cleave.js';
import 'cleave.js/dist/addons/cleave-phone.ru';

class TextField {
    constructor(node) {
        this.root = node;
        this.input = node.querySelector('.js-text-field__input');
        this.hiddenInput = node.querySelector('.js-text-field__hidden-input');
        this.defaultValue = this.input.value;
        this.title = this.input.getAttribute('title') ? this.input.getAttribute('title') : false;
        this.mask = this.input.dataset.mask;

        this.init();
    }

    setValueUpdateEventListener() {
        this.root.addEventListener('update-input-value', event => {
            this.input.value = event.detail.value ? event.detail.value : this.defaultValue;
            this.input.title = event.detail.title ? `${this.title}: ${event.detail.title}` : this.title;
            this.input.setAttribute('aria-label', this.input.title ? this.input.title : this.title);
            this.hiddenInput.value = event.detail.submitValue;
        })
    }

    setMask() {
        switch(this.mask) {
            case 'date':
                new Cleave(this.input, {
                    date: true,
                    dateMin: '1900-01-01',
                    dateMax: '2022-12-31',
                    datePattern: ['d', 'm', 'Y'],
                    delimiter: '.',
                });
                break;
                
            case 'phone':
                new Cleave(this.input, {
                    prefix: '+',
                    blocks: [1, 1, 0, 3, 3, 4],
                    delimiters: [' ', ' ', '(', ') ', '-'],
                    noImmediatePrefix: true,
                    numericOnly: true
                });
                break;
        }
    }

    init() {
        if (this.input.type === 'button') {
            this.hiddenInput.addEventListener('focusin', event => this.input.focus());
        }
        
        this.setValueUpdateEventListener();
        this.setMask();
    }
};

function render() {
    const components = document.querySelectorAll('.js-text-field');
    if (components.length > 0) {
        Array.from(components).map((node) => new TextField(node));
    };
};

render();
