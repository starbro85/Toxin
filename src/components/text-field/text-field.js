import './text-field.css';

import Cleave from 'cleave.js';

const render = require('./../../globals/helpers/render.js');

class TextField {
    constructor(node) {
        this.root = node;
        this.input = this.root.querySelector('.js-text-field__input');
        this.value = this.input.value;  
        this.title = this.input.title;


        this.init();
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
        }
    }

    init() {
        if (this.input.type === 'button') { 
            this.hiddenInput = this.root.querySelector('.js-text-field__hidden-input');
            this.hiddenInput.addEventListener('focus', (event) => this.input.focus());

            this.root.addEventListener('text-field-value-sent', event => {
                this.input.value = event.detail.value ? event.detail.value : this.value;
                this.input.title = event.detail.title ? event.detail.title : this.title;
                this.hiddenInput.value = event.detail.submitValue;
            });
        }

        this.setMask();
    }
};

render('.js-text-field', TextField);
