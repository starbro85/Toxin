import './rate-bar.css';

import './rate-button/rate-button.js';

const render = require('./../../globals/helpers/render.js');

class RateBar {
    constructor(node) {
        this.root = node;
        this.rateButtons = this.root.querySelectorAll('.js-rate-button');

        this.init();
    }

    setFormSubmitEvent() {
        this.rateButtons.forEach(button => button.addEventListener('keyup', event => {
            if ((event.key === 'Enter') || (event.key === 'Backspace')) {
                this.root.submit();
            }
        }));

        this.rateButtons.forEach(button => button.addEventListener('mouseup', event => {
            if (event.which === 1) {
                button.checked = true;

                this.root.submit();
            }
        }));
    }
    
    init() {
        this.setFormSubmitEvent();
    }
};

render('.js-rate-bar', RateBar);