import './datepicker.css';

import Litepicker from 'litepicker/dist/js/main.nocss';
import 'litepicker-module-navkeyboard';
import moment from 'moment';

const render = require('./../../globals/helpers/render.js');
const capitalize = require('./../../globals/helpers/capitalize.js');

class Datepicker {
    constructor(node) {
        this.root = node;
        this.initValue = this.root.dataset.initValue ? JSON.parse(this.root.dataset.initValue) : '';
        this.lang = this.root.dataset.lang;

        this.init();
    }

    sendDatepickerData = (date1, date2) => {
        const date = [date1, date2];

        this.root.dispatchEvent(new CustomEvent('datepicker-data-sent', {
            date: date
        }));
    }

    setAriaAttributesToControls = (element, lang) => {
        const prevButton = element.querySelector('.button-previous-month');
        const nextButton = element.querySelector('.button-next-month');

        const labels = {};

        if (lang === 'ru') {
            labels.prevButton = 'Перейти к предыдущему месяцу';
            labels.nextButton = 'Перейти к следующиму месяцу';
        }

        if (lang === 'en') {
            labels.prevButton = 'Go to prev month'
            labels.nextButton = 'Go to next month';
        }

        prevButton.setAttribute('title', labels.prevButton);
        prevButton.setAttribute('aria-label', labels.prevButton);
        nextButton.setAttribute('title', labels.nextButton);
        nextButton.setAttribute('aria-label', labels.nextButton);
    }

    setAriaAttributesToCells = (element, lang) => {
        const timestump = Number(element.dataset.time);
        const date = capitalize(moment(timestump).locale(lang).format('dddd, LL'));

        element.setAttribute('aria-label', date);
        element.setAttribute('title', date);
    }

    init() {
        new Litepicker({
            element: this.root,
            parentEl: this.root,
            lang: this.lang,
            inlineMode: true,
            numberOfMonths: 1,
            singleMode: false,
            format: 'DD.MM.YYYY',
            startDate: this.initValue ? this.initValue[0] : null,     
            endDate: this.initValue ? this.initValue[1]: null,
            showTooltip: false,
            mobileFriendly: false,
            scrollToDate: false,
            moveByOneMonth: true,
            onRender: (element) => this.setAriaAttributesToControls(element, this.lang),
            onRenderDay: (element) => this.setAriaAttributesToCells(element, this.lang),
            onSelect: this.sendDatepickerData,
            moduleNavKeyboard: true,
            buttonText: {
                previousMonth: 'arrow_back',
                nextMonth: 'arrow_forward'
            }
        })
    }
};

render('.js-datepicker', Datepicker);