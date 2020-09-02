export class Expander {
    constructor(root, options) {
        this.root = root;
        this.options = options;

        this._init();
    }

    _handleTrapFocus = (event) => {
        if (this.expanded && event.code === 'Tab' && event.shiftKey && document.activeElement === this.firstFocusableElement) {
            this.lastFocusableElement.focus();
            event.preventDefault();
        } else if (this.expanded && event.code === 'Tab' && !event.shiftKey && document.activeElement === this.lastFocusableElement) {
            this.firstFocusableElement.focus();
            event.preventDefault();
        } 
    }

    _handleEscapeKeyPress = (event) => {
        if (this.expanded && event.code === 'Escape') {
            this._toggle();

            if (this.options.multiple) { 
                this.buttons[0].focus(); 
            } else { 
                this.button.focus(); 
            }
        }
    }

    _handleOutsideClick = (event) => {
        if (!this.root.contains(event.target)) {
            this._toggle();

            if (document.activeElement === document.body) {
                if (this.options.multiple) { 
                    this.buttons[0].focus(); 
                } else { 
                    this.button.focus(); 
                }
            }
        }
    }

    _toggleTrapFocus() {
        if (this.expanded) {
            this.root.addEventListener('keydown', this._handleTrapFocus);
            document.addEventListener('keyup', this._handleEscapeKeyPress);
        } else {
            this.root.removeEventListener('keydown', this._handleTrapFocus);
            document.removeEventListener('keyup', this._handleEscapeKeyPress);
        }
    }

    _toggleOutsideClickCollapse() { 
        if (this.expanded) { 
            document.addEventListener('mousedown', this._handleOutsideClick); 
        } else { 
            document.removeEventListener('mousedown', this._handleOutsideClick); 
        } 
    }

    _toggelDisableForHiddenElements() {
        this.inputs.forEach((input) => input.disabled = !this.expanded);
    }

    _toggle = () => {
        if (this.options.multiple) { 
            this.expanded = !JSON.parse(this.buttons[0].getAttribute('aria-expanded'));

            this.buttons.forEach((button) => button.setAttribute('aria-expanded', this.expanded)); 
        } else { 
            this.expanded = !JSON.parse(this.button.getAttribute('aria-expanded'));

            this.button.setAttribute('aria-expanded', this.expanded); 
        }

        if (this.options.disableHiddenElements) {
            this._toggelDisableForHiddenElements();
        }

        this.root.classList.toggle(this.options.toggleClass);

        if (this.options.trapFocus) { 
            this._toggleTrapFocus(); 
        }

        if (this.options.outsideClickCollapse) { 
            this._toggleOutsideClickCollapse(); 
        }
    }

    _init() {
        if (this.options.disableHiddenElements) {
            this.container = this.options.container;
            this.inputs = this.container.querySelectorAll('input');

            this._toggelDisableForHiddenElements();
        }

        if (this.options.trapFocus) {
            this.focusableElements = this.root.querySelectorAll('a[href]:not([disabled]):not([tabindex="-1"]), button:not([disabled]):not([tabindex="-1"]), input:not([disabled]):not([tabindex="-1"]), [tabindex="0"]:not(:disabled)');
            this.firstFocusableElement = this.focusableElements[0];
            this.lastFocusableElement = this.focusableElements[this.focusableElements.length - 1];
        }

        if (this.options.multiple) { 
            this.buttons = this.options.control;

            this.buttons.forEach((button) => button.addEventListener('click', this._toggle));
        }
            
        else { 
            this.button = this.options.control;

            this.button.addEventListener('click', this._toggle);
        }
    }
};