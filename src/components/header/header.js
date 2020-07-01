import './header.css';
import './menu/menu.css';

import './../logo/logo.js';
import './../link/link.js';

import {Menu} from './menu/menu.js'

const render = require('./../../globals/helpers/render.js');

class Header {
    constructor(node) {
        this.root = node;
        this.button = this.root.querySelector('.js-header__button')

        this.expanded = JSON.parse(this.button.getAttribute('aria-expanded'));
   
        this.init();
    }

    handleCollapse = (event) => { 
        if (!this.root.contains(event.target)) {
            this.toggleExpand();
        }
    }

    toggleExpand = () => {
        this.expanded = !(this.expanded);
        this.button.setAttribute('aria-expanded', this.expanded);
        this.root.classList.toggle('header_expanded');
        this.expanded ? document.addEventListener('click', this.handleCollapse) : document.removeEventListener('click', this.handleCollapse);
    };

    init() {
        this.button.addEventListener('click', this.toggleExpand);
    }
};

render('.js-menu', Menu);
render('.js-header', Header);
