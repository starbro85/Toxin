import './form-booking.css';

import './../button/button.js';
import './../date-dropdown/date-dropdown.js';
import './../quantity-dropdown/quantity-dropdown.js';

import wnumb from 'wnumb';

const moneyFormat = new wnumb({
    decimals: 0,
    suffix: '₽',
    thousand: ' '
})
const pluralize = require('./../../globals/helpers/pluralize.js');

class FormBooking {
    constructor(node) {
        this.root = node;
        this.dateDropdown = this.root.querySelector('.js-date-dropdown');
        this.rentTermField = this.root.querySelector('.js-form-booking__calc-rent-term');
        this.summaryPriceField = this.root.querySelector('.js-form-booking__calc-value_summary-price');
        this.totalPriceField = this.root.querySelector('.js-form-booking__total-price');


        this.rentTermFieldPlural = JSON.parse(this.rentTermField.dataset.plural);
        this.rentPrice = moneyFormat.from(this.root.querySelector('.js-form-booking__calc-rent-price').innerHTML);
        this.servicePrice = moneyFormat.from(this.root.querySelector('.js-form-booking__calc-value_service-price').innerHTML);
        this.additionPrice = moneyFormat.from(this.root.querySelector('.js-form-booking__calc-value_addition-price').innerHTML);
        this.discount = moneyFormat.from(this.root.querySelector('.js-form-booking__calc-discount').innerHTML);

        this.init();
    }

    init() {
        this.dateDropdown.addEventListener('data-sent', event => {
            const dayRange = event.detail.dateDropdownData.dayRange;
            const rentTerm = pluralize(this.rentTermFieldPlural, dayRange);
            const summaryPrice = this.rentPrice * dayRange;
            const totalPrice = summaryPrice + this.servicePrice + this.additionPrice - this.discount;

            this.rentTermField.innerHTML = rentTerm;
            this.summaryPriceField.innerHTML = moneyFormat.to(summaryPrice);
            this.totalPriceField.innerHTML = moneyFormat.to(totalPrice);
        })
    }
};

function render() {
    const components = document.body.querySelectorAll('.js-form-booking');
    if (components.length > 0) {
        Array.from(components).map((node) => new FormBooking(node));
    };
};

render();