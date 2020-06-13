import './date-dropdown.css';

import '../dropdown/dropdown.js';
import '../datepicker/datepicker.js';

import moment from 'moment';

class DateDropdown {
    constructor(node) {
        this.root = node;
        this.isTwin = this.root.dataset.twin;
        this.datepicker = this.root.querySelector('.js-date-dropdown__datepicker');

        if (this.isTwin) {
            this.input = this.root.querySelectorAll('.js-date-dropdown__input');
        }
        else {
            this.input = this.root.querySelector('.js-date-dropdown__input');
        }


        this.dateDropdownData = {};
        this.datepickerData = {};

        this.init();
    }

    getInputValue() {
        if (this.isTwin) {
            return this.datepickerData.date ? this.datepickerData.date.map(item => moment(item).format('DD.MM.YYYY')) : ['', ''];
        }

        else {
            return this.datepickerData.date ? this.datepickerData.date.reduce((acc, item) => `${acc}${moment(item).format('DD.MM.YYYY')} - `, '').slice(0, -2) : '';
        }
    }

    getDateDropdwonData() {
        this.dateDropdownData = {
            startDate: this.datepickerData.date ? this.datepickerData.date[0] : '',
            endDate: this.datepickerData.date ? this.datepickerData.date[1] : '',
            dayRange: this.datepickerData.date ? (this.datepickerData.date[1] - this.datepickerData.date[0]) / 1000 / 60 / 60 / 24 : 0
        }
    }

    addUpdateInputValueEvent() {
        const inputValue = this.getInputValue();

        if (this.isTwin) {
            this.input.forEach((item, index) => 
                item.dispatchEvent(new CustomEvent('update-input-value', {
                    detail: {
                        value: inputValue[index],
                        title: inputValue[index],
                        submitValue: this.datepickerData.date ? this.datepickerData.date[index] : ''
                    }
                }))
            )
        }
        else {
            this.input.dispatchEvent(new CustomEvent('update-input-value', {
                detail: {
                    inputValue: inputValue,
                    inputTitle: inputValue,
                    hiddenInputValue: this.datepickerData.date
                }
            }));
        }
    }

    addDataSentEvent() {
        this.getDateDropdwonData();

        this.root.dispatchEvent(new CustomEvent('data-sent', {
            detail: {
                dateDropdownData: this.dateDropdownData
            }
        }))
        console.log(this.dateDropdownData)
    }

    setDataSentEventListener() {
        this.datepicker.addEventListener('data-sent', event => { 
            this.datepickerData = event.detail.datepickerData;

            this.addUpdateInputValueEvent();
            this.addDataSentEvent();
        });
    }

    init() {
        this.setDataSentEventListener();
    }
};

function render() {
    const components = document.body.querySelectorAll('.js-date-dropdown');
    if (components.length > 0) {
        Array.from(components).map((node) => new DateDropdown(node));
    };
};

render();