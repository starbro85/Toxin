import './form-booking.css';

import './tooltip/tooltip.js';
import '../button/button.js';
import '../quantity-dropdown/quantity-dropdown.js';

import wnumb from 'wnumb';

const moneyFormat = new wnumb({
    decimals: 0,
    suffix: '₽',
    thousand: ' '
})
const pluralize = require('../../globals/helpers/pluralize.js');
const render = require('../../globals/helpers/render.js');

class FormBooking {
    constructor(node) {
        this.root = node;
        this.dateDropdown = this.root.querySelector('.js-form-booking__date-dropdown');
        this.periodContainer = this.root.querySelector('.js-form-booking__period');
        this.rentContainer = this.root.querySelector('.js-form-booking__rent');
        this.summaryContainer = this.root.querySelector('.js-form-booking__summary');
        this.serviceContainer = this.root.querySelector('.js-form-booking__service');
        this.additionContainer = this.root.querySelector('.js-form-booking__addition');
        this.discountContainer = this.root.querySelector('.js-form-booking__discount');
        this.priceContainer = this.root.querySelector('.js-form-booking__price');
        this.priceInput = this.root.querySelector('.js-form-booking__price-input');

        this.periodPlural = JSON.parse(this.periodContainer.dataset.plural);
        this.rent = moneyFormat.from(this.rentContainer.innerHTML);
        this.service = moneyFormat.from(this.serviceContainer.innerHTML);
        this.addition = moneyFormat.from(this.additionContainer.innerHTML);
        this.discount = moneyFormat.from(this.discountContainer.innerHTML);

        this.init();
    }

    init() {   
        this.dateDropdown.addEventListener('date-dropdown-value-apply', (event) => {
            this.arriveTimestamp = event.detail.values[0];
            this.departureTimestamp = event.detail.values[1];
            this.dateRange = this.departureTimestamp && this.arriveTimestamp ? Math.floor((this.departureTimestamp - this.arriveTimestamp)/(60*60*24*1000)) : 0;
            this.periodContainer.innerHTML = pluralize(this.periodPlural, this.dateRange);
            this.summary = this.rent * this.dateRange;
            this.summaryContainer.innerHTML = moneyFormat.to(this.summary);
            this.price = this.summary + this.service + this.addition - this.discount;
            this.priceContainer.innerHTML = this.price > 0 ? moneyFormat.to(this.price) : moneyFormat.to(0);
            this.priceInput.value = this.price > 0 ? this.price : 0;
        });
    }
};

render('.js-form-booking', FormBooking);