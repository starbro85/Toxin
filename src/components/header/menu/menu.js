class Menu {
    constructor(node, Expander) {
        this.root = node;
        this.button = this.root.querySelector('.js-menu__button');

        this.Expander = Expander;

        this.init();
    }

    init() {
        new this.Expander(this.root, {
            control: this.button,
            toggleClass: 'menu_expanded',
            trapFocus: true,
            outsideClickCollapse: true
        })
    }
}

export { Menu };