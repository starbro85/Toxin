import './expandable-list.css';

const render = require('./../../globals/helpers/render.js');

class ExpandableList {
    constructor(node) {
        this.root = node;
        this.button = this.root.querySelector('.js-expandable-list__button');

        this.expanded = JSON.parse(this.button.getAttribute('aria-expanded'));
   
        this.init();
    }

    toggleExpand = () => {
        this.expanded = !(this.expanded);
        this.button.setAttribute('aria-expanded', this.expanded);
        this.root.classList.toggle('expandable-list_expanded');
    };

    init() {
        this.button.addEventListener('click', this.toggleExpand);
    }
};

render('.js-expandable-list', ExpandableList);