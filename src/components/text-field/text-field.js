import Cleave from 'cleave.js';

export class TextField {
    constructor(node) {
        this.root = node;
        this.input = this.root.querySelector('.js-text-field__input');
        this.hiddenInput = this.root.querySelector('.js-text-field__hidden-input');
        this.placeholder = this.input.dataset.placeholder;  
        this.dateMask = this.input.hasAttribute('data-date-mask');  
        this.title = this.input.dataset.title;
        this.lang = this.root.dataset.lang;
        this.i18n = require('./i18n.json')[this.lang];

        this._init();
    }

    _relocateHiddenInputFocus() {
        this.hiddenInput.addEventListener('focus', (event) => this.input.focus());
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
        if (this.dateMask) { 
            this._setDateMask(); 
        }

        if (this.hiddenInput) { 
            this._relocateHiddenInputFocus(); 
        }
    }

    setPlaceholder(placeholder) {
        if (this.input.type === 'button') {
            this.input.value = placeholder ? placeholder : this.placeholder;
        } else {
            placeholder ? this.input.setAttribute('placeholder', placeholder) : this.input.setAttribute('placeholder', this.placeholder);
        }
    }

    setTitle(title) {
        title ? this.input.setAttribute('title', title) : this.input.setAttribute('title', this.title);
    }   

    setValue(value) {
        if (this.input.getAttribute('type') === 'button') {
            this.hiddenInput.value = value ? value : '';
        } else {
            this.input.value = value ? value : '';
        }
    }
};

export default function render () {
    const components = document.querySelectorAll('.js-text-field');

    if (components.length > 0) {
        Array.from(components).map((node) => new TextField(node));
    };
}