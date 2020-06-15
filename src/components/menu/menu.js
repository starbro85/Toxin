import './menu.css';

class Menu {
    constructor(node) {
        this.root = node;
        this.button = this.root.querySelector('.js-menu__button')
        this.list = this.root.querySelector('.js-menu__list');
   
        this.init();
    }

    expand() {
        this.root.classList.add('menu_expanded');
        this.button.setAttribute('aria-expanded', true)
    };

    collapse() {
        this.root.classList.remove('menu_expanded');
        this.button.setAttribute('aria-expanded', false)
    };

    toggle = () => (this.root.classList.contains('menu_expanded')) ? this.collapse() : this.expand();

    handleClickEvent = event => {
        this.button.contains(event.target) ? this.toggle() :
        !this.root.contains(event.target)  ? this.collapse() :
        false;
    }

    handleFocusEvent = event => !this.root.contains(event.target) ? this.collapse() : false;

    setEventListeners() {
        document.addEventListener('focusin', this.handleFocusEvent);
        document.addEventListener('click', this.handleClickEvent);
    }

    init() {
        this.button.addEventListener('click', event => this.setEventListeners());
    }
};

function render() {
    const components = document.body.querySelectorAll('.js-menu');
    if (components.length > 0) {
        Array.from(components).map((node) => new Menu(node));
    };
};

render();