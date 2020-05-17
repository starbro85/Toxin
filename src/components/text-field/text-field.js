import './text-field.css';

import Cleave from 'cleave.js';
import 'cleave.js/dist/addons/cleave-phone.ru';

class TextField {
    constructor(node) {
        this.root = node;
        this.input = node.querySelector('.js-text-field__input');
        this.mask = this.input.dataset.mask;
        this.theme = this.root.dataset.theme;

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
        this.root.classList.add('text-field_theme_' + this.theme);

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