import './checkbox.css';

class Checkbox {
    constructor(node) {
        this.root = node;
        this.theme = this.root.dataset.theme;

        this.init();
    }

    init() {
        this.root.classList.add('checkbox_theme_' + this.theme);
    }
};

function render() {
    const components = document.body.querySelectorAll('.js-checkbox');
    if (components.length > 0) {
        Array.from(components).map((node) => new Checkbox(node));
    };
};

render();