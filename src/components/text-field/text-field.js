import './text-field.css';

import Cleave from 'cleave.js';

export class TextField {
    constructor(node) {
        this.root = node;
        this.input = this.root.querySelector('.js-text-field__input');
        this.value = this.input.value;  
        this.title = this.input.title;


        this._init();
    }

    _setMask() {
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

    _init() {
        this._setMask();
    }

    render(parent) {
        const components = parent ? parent.querySelectorAll('.js-text-field') : document.querySelectorAll('.js-text-field');

        if (components.length > 0) {
            Array.from(components).map((node) => new TextField(node)._init());
        };
    }
};