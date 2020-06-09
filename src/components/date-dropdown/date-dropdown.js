import './date-dropdown.css';

import '../datepicker/datepicker.js';
import '../dropdown/dropdown.js';

import moment from 'moment';

class DateDropdown {
    constructor(node) {
        this.root = node;
        this.isTwin = this.root.dataset.twin;
        

        if (this.isTwin) {
            this.inputFrom = this.root.querySelector('.js-date-dropdown__input_from');
            this.inputTo = this.root.querySelector('.js-date-dropdown__input_to');
        }
        else {
            this.input = this.root.querySelector('.js-date-dropdown__input');
        }

        this.datepicker = this.root.querySelectorAll('.js-date-dropdown__datepicker');
        this.datepickerData = {};

        this.init();
    }

    addUpdateInputValueEvent() {
        const inputValue = this.isTwin ?
            this.datepickeData.date.map(item => moment(item)._isValid ? moment(item).format('DD.MM.YYYY') : '') :
            this.datepickeData.date.reduce((acc, item) => `${acc}${moment(item).format('DD.MM.YYYY')} - `, '').slice(0, -2);

        const hiddenInputValue = this.datepickeData.date;

        if (this.isTwin) {
            this.inputFrom.dispatchEvent(new CustomEvent('update-input-value', {
                detail: {
                    inputValue: inputValue[0],
                    inputTitle: inputValue[0],
                    hiddenInputValue: hiddenInputValue
                }
            }));
    
            this.inputTo.dispatchEvent(new CustomEvent('update-input-value', {
                detail: {
                    inputValue: inputValue[1],
                    inputTitle: inputValue[1],
                    hiddenInputValue: hiddenInputValue
                }
            }));
        }
        else {
            this.input.dispatchEvent(new CustomEvent('update-input-value', {
                detail: {
                    inputValue: inputValue,
                    inputTitle: inputValue,
                    hiddenInputValue: hiddenInputValue
                }
            }));
        }
    }

    handleDataSentEvent = event => {
        this.datepickeData = event.detail.datepickerData;
        this.addUpdateInputValueEvent();
    }

    setDataSentEventListener() {
        this.datepicker.forEach(item => item.addEventListener('data-sent', this.handleDataSentEvent));
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