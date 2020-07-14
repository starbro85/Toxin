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
const render = require('./../../globals/helpers/render.js');

class FormBooking {
    constructor(node) {
        this.root = node;
        this.dateDropdown = this.root.querySelector('.js-form-booking__date-dropdown');
        this.rentTermContainer = this.root.querySelector('.js-form-booking__calc-rent-term');
        this.rentPriceContainer = this.root.querySelector('.js-form-booking__calc-rent-price');
        this.summaryPriceContainer = this.root.querySelector('.js-form-booking__calc-summary-price');
        this.servicePriceContainer = this.root.querySelector('.js-form-booking__calc-service-price');
        this.additionPriceContainer = this.root.querySelector('.js-form-booking__calc-addition-price');
        this.discountContainer = this.root.querySelector('.js-form-booking__calc-discount');
        this.totalPriceContainer = this.root.querySelector('.js-form-booking__total-price');

        this.rentTermPlural = JSON.parse(this.rentTermContainer.dataset.plural);
        this.rentPrice = moneyFormat.from(this.rentPriceContainer.innerHTML);
        this.servicePrice = moneyFormat.from(this.servicePriceContainer.innerHTML);
        this.additionPrice = moneyFormat.from(this.additionPriceContainer.innerHTML);
        this.discount = moneyFormat.from(this.discountContainer.innerHTML);

        this.init();
    }

    init() {   
        this.dateDropdown.addEventListener('date-dropdown-from-update', (event) => {
            this.arrivalTimestamp = event.detail.value;
        });
        this.dateDropdown.addEventListener('date-dropdown-to-update', (event) => {
            this.departureTimestamp = event.detail.value;
            this.dateRange = Math.floor((this.departureTimestamp - this.arrivalTimestamp)/(60*60*24*1000));
            this.rentTermContainer.innerHTML = pluralize(this.rentTermPlural, this.dateRange);
            this.summaryPrice = this.rentPrice * this.dateRange;
            this.summaryPriceContainer.innerHTML = moneyFormat.to(this.summaryPrice);
            this.totalPrice = this.summaryPrice + this.servicePrice + this.additionPrice - this.discount;
            this.totalPriceContainer.innerHTML = moneyFormat.to(this.totalPrice);
        });
    }
};

render('.js-form-booking', FormBooking);