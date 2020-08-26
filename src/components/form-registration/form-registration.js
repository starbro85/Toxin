import './form-registration.css';

import '../button/button.js';
import '../text-field/text-field.js';
import '../radio-bar/radio-bar.js';
import '../toggle/toggle.js';

import { TextField } from '../text-field/text-field.js';

export class FormRegistration {
    constructor(node) {
        if (node) {
            this.root = node;
        }
    }

    _init() { 
        new TextField().render(this.root);
    }

    render(parent) {
        const components = parent ? parent.querySelectorAll('.js-form-registration') : document.querySelectorAll('.js-form-registration');

        if (components.length > 0) {
            Array.from(components).map((node) => new FormRegistration(node)._init());
        };
    }
};