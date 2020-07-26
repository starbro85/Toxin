class Expander {
    constructor(node, button, options) {
        this.root = node;
        this.button = button;
        this.focusableElements = this.root.querySelectorAll('a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="button"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])');
        this.firstFocusableElement = this.focusableElements[0];
        this.lastFocusableElement = this.focusableElements[this.focusableElements.length - 1];

        this.expanded = JSON.parse(this.button.getAttribute('aria-expanded'));

        this.toggleClass = options.toggleClass;    
        this.trapFocus = options.trapFocus;
        this.outsideClickCollapse = options.outsideClickCollapse;
        this.disableOutsideEvents = options.disableOutsideEvents;

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
        this.root.classList.remove(this.toggleClass);
        
        this.outsideClickCollapse ? document.removeEventListener('mouseup', this.handleOutsideClick) : false;

        if (this.trapFocus) {
            this.root.removeEventListener('keydown', this.handleTrapFocus);
            document.removeEventListener('keyup', this.handleEscapeKeyPress);
        }

        if (this.disableOutsideEvents) {
            document.body.classList.remove('backdrop');
        }
    }

    expand() {
        this.expanded = true;
        this.button.setAttribute('aria-expanded', this.expanded);
        this.root.classList.add(this.toggleClass);


        this.outsideClickCollapse ? document.addEventListener('mouseup', this.handleOutsideClick) : false;

        if (this.trapFocus) {  
            this.root.addEventListener('keydown', this.handleTrapFocus);
        }

        if (this.disableOutsideEvents) {
            document.body.classList.add('backdrop');
        }
    }

    toggle = () => {
        this.expanded ? this.collapse() : this.expand();
    }

    adoptBackdropStyleToBody() {
        const sheet = new CSSStyleSheet();
        sheet.replaceSync('.backdrop:before {content: ""; position: fixed;z-index: 1;left: 0;display: flex;width: 100%;height: 100%;background-color: var(--dark-shade-25per);}');
        document.adoptedStyleSheets = [sheet];
    }

    init() {
        if (this.disableOutsideEvents) {
            this.adoptBackdropStyleToBody();
        }

        this.button.addEventListener('click', this.toggle);
    }
};

export { Expander };