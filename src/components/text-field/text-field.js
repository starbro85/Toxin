import './text-field.css';

import Cleave from 'cleave.js';

export class TextField {
    constructor(node) {
        this.root = node;
        this.input = this.root.querySelector('.js-text-field__input');
        this.hiddenInput = this.root.querySelector('.js-text-field__hidden-input');
        this.placeholder = this.input.dataset.placeholder;  
        this.title = this.input.dataset.title;
        this.lang = this.root.dataset.lang;
        this.i18n = require('./i18n.json')[this.lang];

        this._init();
    }

    _setDateMask() {
        new Cleave(this.input, {
            date: true,
            dateMin: '1900-01-01',
            dateMax: '2022-12-31',
            datePattern: this.i18n.pattern,
            delimiter: this.i18n.delimiter,
        });
    }

    _init() {
        if (this.datemMask) { this._setDateMask(); }
    }

    setValue(value) {
        this.input.value = value ? value : this.placeholder;
    }

    setTitle(value) {
        value ? this.input.setAttribute('title', value) : this.input.setAttribute('title', this.title);
    }   

    setSubmitValue(value) {
        this.hiddenInput.value = value ? value : '';
    }

    render(parent) {
        const components = parent ? parent.querySelectorAll('.js-text-field') : document.querySelectorAll('.js-text-field');

        if (components.length > 0) {
            Array.from(components).map((node) => new TextField(node)._init());
        };
    }
};