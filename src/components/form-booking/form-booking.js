const pluralize = require('../../globals/helpers/pluralize.js');
const currencyFormat = require('../../globals/helpers/currencyFormat.js');
const currencyNumberConvert = require('../../globals/helpers/currencyNumberConvert.js');

class FormBooking {
    constructor(node) {
        this.root = node;
        this.dateDropdown = this.root.querySelector('.js-form-booking__date-dropdown');
        this.periodContainer = this.root.querySelector('.js-form-booking__period');
        this.rentContainer = this.root.querySelector('.js-form-booking__rent');
        this.summaryContainer = this.root.querySelector('.js-form-booking__summary');
        this.discountContainer = this.root.querySelector('.js-form-booking__discount');
        this.serviceContainer = this.root.querySelector('.js-form-booking__service');
        this.additionContainer = this.root.querySelector('.js-form-booking__addition');
        this.priceContainer = this.root.querySelector('.js-form-booking__price');
        this.input = this.root.querySelector('.js-form-booking__input');
        this.lang = this.root.dataset.lang;
        this.currency = this.root.dataset.currency;
        this.i18n = require('./i18n.json')[this.lang];

        this._init()
    }

    _setPeriodInnerText(dates) {
        this.arrivalTimestamp = dates[0];
        this.departureTimestamp = dates[1];
        this.rentPeriod = this.departureTimestamp && this.arrivalTimestamp ? (this.departureTimestamp - this.arrivalTimestamp) / 1000 / 24 / 60 / 60 : 0;

        this.periodContainer.innerText = `${this.rentPeriod} ${pluralize(this.lang, this.i18n.DAY_PLURAL, this.rentPeriod)}`;
    }

    _setSummaryInnerText() {
        this.rentPrice = currencyNumberConvert(this.rentContainer.innerText);
        this.summaryPrice = this.rentPrice * this.rentPeriod;

        this.summaryContainer.innerText = currencyFormat(this.lang, this.currency, this.summaryPrice);
    }

    _setPriceInnerText() {
        this.discount = currencyNumberConvert(this.discountContainer.innerText);
        this.servicePrice = currencyNumberConvert(this.serviceContainer.innerText);
        this.additionPrice = currencyNumberConvert(this.additionContainer.innerText);

        this.price = this.summaryPrice + this.servicePrice + this.additionPrice - this.discount;
        this.priceContainer.innerText = this.price > 0 ? currencyFormat(this.lang, this.currency, this.price) : currencyFormat(this.lang, this.currency, 0);
    }

    _setInputValue() {
        this.input.value = this.price > 0 ? this.price : 0;
    }

    _setEventListeners() {
        this.root.addEventListener('date-dropdown-changed', (event) => {
            event.stopPropagation();
            const dates = event.detail.dates;

            this._setPeriodInnerText(dates);
            this._setSummaryInnerText();
            this._setPriceInnerText();
            this._setInputValue();
        })
    }

    _init() {
        this._setEventListeners();
    }
};

export default function render () {
    const components = document.querySelectorAll('.js-form-booking');

    if (components.length > 0) {
        Array.from(components).map((node) => new FormBooking(node));
    };
}