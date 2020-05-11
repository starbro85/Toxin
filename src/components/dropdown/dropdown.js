import './../icon/icon.js';
import './../text-field/text-field.js';
import './dropdown.css';

class Dropdown {
    constructor(node) {
        this.root = node;
        this.button = this.root.querySelector('.js-dropdown__button');
        this.container = this.root.querySelector('.js-dropdown__container');
        this.input = this.root.querySelector('.js-dropdown__input');
        this.tabbableElements = this.container.querySelectorAll('[tabindex]');
        this.theme = this.root.dataset.theme;
        this.stateDisabled = this.root.dataset.stateDisabled;
        this.stateShow = this.root.dataset.stateShow;

        this.init();
    }

    setTheme() {
        this.root.classList.add('dropdown_theme_' + this.theme);
    }

    setState() {
        if (this.stateShow)
            this.show();
        if (this.stateDisabled)
            this.button.disabled = true;
    }
    
    showTabbableElements() {
        Array.from(this.tabbableElements).forEach((element) => element.tabIndex = 0);
    }

    hideTabbableElements() {
        Array.from(this.tabbableElements).forEach((element) => element.tabIndex = -1);
    }

    show() {
        this.root.classList.add('dropdown_is_showed');
        this.showTabbableElements();
    };

    hide() {
        this.root.classList.remove('dropdown_is_showed');
        this.hideTabbableElements();
    };

    toggle = () => (this.root.classList.contains('dropdown_is_showed')) ? this.hide() : this.show();

    handleToggleEvent = (event) =>  (!this.root.contains(event.target)) ?
                                        this.hide() :
                                    (Object.is(event.target, this.button)) ?
                                        this.toggle() :
                                    this.show();

    setToggleEventListener() {
        if (!this.root.dataset.disabled)
            document.onclick = this.handleToggleEvent;
    }

    init() {
        this.hideTabbableElements();
        this.setTheme();
        this.setState();
        this.setToggleEventListener();
    }
};

function render() {
    const components = document.querySelectorAll('.js-dropdown');
    if (components.length > 0) {
        Array.from(components).map((node) => new Dropdown(node));
    };
};

render();

