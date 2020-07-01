class Menu {
    constructor(node) {
        this.root = node;
        this.button = this.root.querySelector('.js-menu__button')
        this.container = this.root.querySelector('.js-menu__containter');
        this.focusableElements = this.container.querySelectorAll('a:not([tabindex="-1"]):not(:disabled)');
        this.firstFocusableElement = this.focusableElements[0];
        this.lastFocusableElement = this.focusableElements[this.focusableElements.length - 1];

        this.expanded = JSON.parse(this.button.getAttribute('aria-expanded'));
   
        this.init();
    }

    handleCollapse = (event) => { 
        if (event.key === 'Escape') {
            this.toggleExpand();
            this.button.focus();
        }

        if (!this.root.contains(event.target)) {
            this.toggleExpand();
        }
    }

    toggleExpand = () => {
        this.expanded = !(this.expanded);
        this.button.setAttribute('aria-expanded', this.expanded);
        this.root.classList.toggle('menu_expanded');
        this.expanded ? document.addEventListener('click', this.handleCollapse) : document.removeEventListener('click', this.handleCollapse);
        this.focusableElements.forEach(element => this.expanded ? element.addEventListener('keyup', this.handleCollapse) : element.removeEventListener('keyup', this.handleCollapse));
        this.lastFocusableElement.addEventListener('blur', () => this.expanded ? this.firstFocusableElement.focus() : this.firstFocusableElement.focus());
    };

    init() {
        this.button.addEventListener('click', this.toggleExpand);
    }
};

export {Menu};