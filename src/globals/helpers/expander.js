class Expander {
    constructor(node, button, expandClass) {
        this.root = node;
        this.button = button;
        this.focusableElements = this.root.querySelectorAll('a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="button"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])');
        this.firstFocusableElement = this.focusableElements[0];
        this.lastFocusableElement = this.focusableElements[this.focusableElements.length - 1];

        this.expanded = JSON.parse(this.button.getAttribute('aria-expanded'));
        this.expandClass = expandClass;       

        this.init();
    }

    handleTrapFocus = (event) => {
        if (event.code === 'Tab' && event.shiftKey && document.activeElement === this.firstFocusableElement) {
            this.lastFocusableElement.focus();
            event.preventDefault();
        } 

        else if (event.code === 'Tab' && !event.shiftKey && document.activeElement === this.lastFocusableElement) {
            this.firstFocusableElement.focus();
            event.preventDefault();
        } 
    }

    handleOutsideClick = (event) => {
        if (!this.root.contains(event.target) || (event.code === 'Escape')) {
            this.collapse();
            if (!document.activeElement) {
                this.button.focus();
            }
        }
    }

    handleEscapeKeyPress = (event) => {
        if (event.code === 'Escape') {
            this.collapse();
            this.button.focus();
        }
    }

    collapse() {
        this.expanded = false;
        this.button.setAttribute('aria-expanded', this.expanded);
        this.root.classList.remove(this.expandClass);
        
        this.root.removeEventListener('keydown', this.handleTrapFocus);
        document.removeEventListener('mouseup', this.handleOutsideClick);
        document.removeEventListener('keyup', this.handleEscapeKeyPress);
    }

    expand() {
        this.expanded = true;
        this.button.setAttribute('aria-expanded', this.expanded);
        this.root.classList.add(this.expandClass);

        
        this.root.addEventListener('keydown', this.handleTrapFocus);
        document.addEventListener('mouseup', this.handleOutsideClick);
        document.addEventListener('keyup', this.handleEscapeKeyPress);
    }

    toggle = () => {
        this.expanded ? this.collapse() : this.expand();
    }

    init() {
        this.button.addEventListener('click', this.toggle);
    }
};

export { Expander };