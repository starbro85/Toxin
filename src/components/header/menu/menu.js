class Menu {
    constructor(node, Expander) {
        this.root = node;
        this.button = this.root.querySelector('.js-menu__button');

        this.Expander = Expander;

        this.init();
    }

    init() {
        new this.Expander(this.root, this.button, 'menu_expanded')
    }
}

export { Menu };