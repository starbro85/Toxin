import './button.css';

import '../icon/icon.js';

class Button {
    constructor(node) {
        this.root = node;
        this.theme = this.root.dataset.theme;

        this.init();
    }

    init() {
        this.root.classList.add('button_theme_' + this.theme);
    }
};

function render() {
    const components = document.body.querySelectorAll('.js-button');
    if (components.length > 0) {
        Array.from(components).map((node) => new Button(node));
    };
};

render();