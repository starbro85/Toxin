import './datepicker.css';

import flatpickr from 'flatpickr';
import { Russian } from 'flatpickr/dist/l10n/ru.js';
import moment from 'moment';

const capitalize = require('./../../../globals/helpers/capitalize.js');


class Datepicker {
    constructor(node) {
        this.root = node;
        this.initValue = this.root.dataset.initValue
            ? JSON.parse(this.root.dataset.initValue)
            : '';
        this.lang = this.root.dataset.lang;

        this.init();
    }

    onReady = () => {
        this.calendar = this.root.querySelector('.flatpickr-calendar');
        this.days = this.root.querySelector('.flatpickr-days');

        this.prevButton = this.root.querySelector('.flatpickr-prev-month');
        this.nextButton = this.root.querySelector('.flatpickr-next-month');
        this.yearInput = this.root.querySelector('.numInput');

        let prevButtonAriaLabel;
        let nextButtonAriaLabel;

        if (this.lang === 'ru') {
            this.prevButtonAriaLabel = 'Предыдущий месяц';
            this.nextButtonAriaLabel = 'Следующий месяц';
        }

        if (this.lang === 'en') {
            this.prevButtonAriaLabel = 'Previous month';
            this.nextButtonAriaLabel = 'Next month';
        }

        this.calendar.setAttribute('tabindex', false);
        this.days.setAttribute('tabindex', false);

        this.yearInput.setAttribute('tabindex', '0');
        this.yearInput.setAttribute('type', 'text');
        this.yearInput.setAttribute('role', 'spinbutton');
        this.yearInput.setAttribute('aria-valuemin', moment(new Date().getTime()).format('YYYY'));
        this.yearInput.setAttribute('aria-valuenow', this.yearInput.value);
        this.yearInput.addEventListener('keyup', (event) => {
            if (event.code === 'ArrowUp' || event.code === 'ArrowDown') {
                this.yearInput.setAttribute('aria-valuenow', this.yearInput.value);
            }
        })
        this.yearInput.setAttribute('readonly', true);

        this.prevButton.setAttribute('tabindex', '0');
        this.prevButton.setAttribute('role', 'button');
        this.prevButton.setAttribute('aria-label', prevButtonAriaLabel);
        this.nextButton.setAttribute('tabindex', '0');
        this.nextButton.setAttribute('role', 'button');
        this.nextButton.setAttribute('aria-label', nextButtonAriaLabel);
    }

    onDayCreate = (dObj, dStr, fp, dayElem) => {
        const day = dayElem;
        const timestump = Number(`${day.getAttribute('aria-label')}000`);
        const date = capitalize(moment(timestump).locale(this.lang).format('dddd, LL'));

        day.setAttribute('aria-label', date);
        day.setAttribute('title', date);

        if (day.classList.contains('today') || day.classList.contains('startRange') || day.classList.contains('endRange')) {
            day.setAttribute('tabindex', '0');
            day.addEventListener('keydown', (event) => {
                if (event.code === 'Tab') {
                    if (event.shiftKey) {
                        this.nextButton.focus();
                    }
                }
            })
        }  
    }

    sendDatepickerData = (selectedDates) => {
        const values = selectedDates;

        this.root.dispatchEvent(
            new CustomEvent('datepicker-data-sent', {
                detail: {
                    values: values,
                    lang: this.lang
                }
            })
        );
    };

    init() {
        if (this.lang === 'ru') {
            flatpickr.localize(Russian);
        }

        const datepicker = new flatpickr(this.root, {
            appendTo: this.root,
            dateFormat: 'd.m.Y',
            ariaDateFormat: 'U',
            inline: true,
            mode: 'range',
            minDate: new Date().getTime(),
            defaultDate: this.initValue ? this.initValue : null,
            prevArrow: 'arrow_back',
            nextArrow: 'arrow_forward',
            monthSelectorType: 'static',
            onReady: this.onReady,
            onDayCreate: this.onDayCreate,
            onChange: this.sendDatepickerData
        });

        if (this.initValue) {
            this.sendDatepickerData(datepicker.selectedDates);
        }

        else {
            this.sendDatepickerData(['', '']);
        }

        this.root.addEventListener('clear-datepicker', (event) => datepicker.clear());
    }
}

export { Datepicker };
