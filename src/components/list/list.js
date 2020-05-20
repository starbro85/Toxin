import './list.css';

import '../checkbox/checkbox.js';

class List {
    constructor(node) {
        this.root = node;
        this.theme = this.root.dataset.theme;
        this.childrens = this.root.children;

        this.init();
    }

    init() {
        this.root.classList.add('list_theme_' + this.theme);
    }
};

function render() {
    const components = document.body.querySelectorAll('.js-list');
    if (components.length > 0) {
        Array.from(components).map((node) => new List(node));
    };
};

render();