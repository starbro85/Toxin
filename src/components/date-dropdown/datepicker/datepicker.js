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

    handleOnReady = () => {
        const prevButton = this.root.querySelector('.flatpickr-prev-month');
        const nextButton = this.root.querySelector('.flatpickr-next-month');

        let prevButtonAriaLabel;
        let nextButtonAriaLabel;

        if (this.lang === 'ru') {
            prevButtonAriaLabel = 'Предыдущий месяц';
            nextButtonAriaLabel = 'Следующий месяц';
        }

        if (this.lang === 'en') {
            prevButtonAriaLabel = 'Previous month';
            nextButtonAriaLabel = 'Next month';
        }

        prevButton.setAttribute('tabindex', '0');
        prevButton.setAttribute('role', 'button');
        prevButton.setAttribute('aria-label', prevButtonAriaLabel);
        nextButton.setAttribute('tabindex', '0');
        nextButton.setAttribute('role', 'button');
        nextButton.setAttribute('aria-label', nextButtonAriaLabel);

        const calendar = this.root.querySelector('.flatpickr-calendar');
        calendar.setAttribute('tabindex', false);


        const days = this.root.querySelector('.flatpickr-days');
        days.setAttribute('tabindex', false);


        const yearInput = this.root.querySelector('.numInput');
        
        yearInput.setAttribute('tabindex', '0');
        yearInput.setAttribute('type', 'text');
        yearInput.setAttribute('role', 'spinbutton');
        yearInput.setAttribute('aria-valuemin', moment(new Date().getTime()).format('YYYY'));
        yearInput.setAttribute('aria-valuenow', yearInput.value);
        yearInput.setAttribute('readonly', true);
        yearInput.addEventListener('keyup', (event) => {
            if (event.code === 'ArrowUp' || event.code === 'ArrowDown') {
                yearInput.setAttribute('aria-valuenow', yearInput.value);
            }
        });  
    }

    handleOnDayCreate = (dObj, dStr, fp, dayElem) => {
        const day = dayElem;
        const timestump = Number(`${day.getAttribute('aria-label')}000`);
        const date = capitalize(moment(timestump).locale(this.lang).format('dddd, LL'));

        day.setAttribute('aria-label', date);
        day.setAttribute('title', date);

        if (!day.classList.contains('flatpickr-disabled')) { day.setAttribute('tabindex', '0'); }

        day.addEventListener('keydown', (event) => {
            if (event.code === 'Tab' && event.shiftKey) {
                const prevSibling = event.target.previousSibling;

                if (!prevSibling.classList.contains('flatpickr-disabled')) {
                    prevSibling.focus();
                } else { 
                    const nextButton = this.root.querySelector('.flatpickr-next-month');
                    nextButton.focus(); 
                }
            }
        });
    }

    sendDatepickerData = (selectedDates) => {
        this.root.dispatchEvent(
            new CustomEvent('datepicker-data-sent', {
                detail: {
                    dates: selectedDates,
                    lang: this.lang
                }
            })
        );
    };

    init() {
        if (this.lang === 'ru') { flatpickr.localize(Russian); }

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
            onReady: this.handleOnReady,
            onDayCreate: this.handleOnDayCreate,
            onChange: this.sendDatepickerData
        });

        if (this.initValue) {
            this.sendDatepickerData(datepicker.selectedDates);
        }
        
        this.root.addEventListener('clear-datepicker', (event) => datepicker.clear());
    }
}

export { Datepicker };
