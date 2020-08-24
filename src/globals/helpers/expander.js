export class Expander {
    constructor(root, options) {
        this.root = root;
        this.options = options;

        this.init();
    }

    handleTrapFocus = (event) => {
        if (this.expanded && event.code === 'Tab' && event.shiftKey && document.activeElement === this.firstFocusableElement) {
            this.lastFocusableElement.focus();
            event.preventDefault();
        } else if (this.expanded && event.code === 'Tab' && !event.shiftKey && document.activeElement === this.lastFocusableElement) {
            this.firstFocusableElement.focus();
            event.preventDefault();
        } 
    }

    handleEscapeKeyPress = (event) => {
        if (this.expanded && event.code === 'Escape') {
            this.toggle();

            if (this.options.multiple) { this.buttons[0].focus(); }
            
            else { this.button.focus(); }
        }
    }

    handleOutsideClick = (event) => {
        if (!this.root.contains(event.target)) {
            this.toggle();

            if (document.activeElement === document.body) {
                if (this.options.multiple) { this.buttons[0].focus(); }
            
                else { this.button.focus(); }
            }
        }
    }

    toggleTrapFocus() {
        if (this.expanded) {
            this.root.addEventListener('keydown', this.handleTrapFocus);
            document.addEventListener('keyup', this.handleEscapeKeyPress);
        } else {
            this.root.removeEventListener('keydown', this.handleTrapFocus);
            document.removeEventListener('keyup', this.handleEscapeKeyPress);
        }
    }

    toggleOutsideClickCollapse() { 
        if (this.expanded) { document.addEventListener('mousedown', this.handleOutsideClick); } 

        else { document.removeEventListener('mousedown', this.handleOutsideClick); } 
    }

    toggle = () => {
        if (this.options.multiple) { 
            this.expanded = !JSON.parse(this.buttons[0].getAttribute('aria-expanded'));

            this.buttons.forEach((button) => button.setAttribute('aria-expanded', this.expanded)); 
        }
            
        else { 
            this.expanded = !JSON.parse(this.button.getAttribute('aria-expanded'));

            this.button.setAttribute('aria-expanded', this.expanded); 
        }

        this.root.classList.toggle(this.options.toggleClass);

        if (this.options.trapFocus) { this.toggleTrapFocus(); }
        if (this.options.outsideClickCollapse) { this.toggleOutsideClickCollapse(); }
    }

    init() {
        if (this.options.trapFocus) {
            this.focusableElements = this.root.querySelectorAll('a[href]:not([disabled]):not([tabindex="-1"]), button:not([disabled]):not([tabindex="-1"]), input:not([disabled]):not([tabindex="-1"]), [tabindex="0"]:not(:disabled)');
            this.firstFocusableElement = this.focusableElements[0];
            this.lastFocusableElement = this.focusableElements[this.focusableElements.length - 1];
        }

        if (this.options.multiple) { 
            this.buttons = this.options.control;

            this.buttons.forEach((button) => button.addEventListener('click', this.toggle));
        }
            
        else { 
            this.button = this.options.control;

            this.button.addEventListener('click', this.toggle);
        }
    }
};