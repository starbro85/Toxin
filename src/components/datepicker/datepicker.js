import './datepicker.css';

import Litepicker from 'litepicker/dist/js/main.nocss';

class Datepicker {
    constructor(node) {
        this.root = node;
        this.main = this.root.querySelector('.js-datepicker__main');
        this.clearButton = this.root.querySelector('.js-datepicker__clear-button');
        this.applyButton = this.root.querySelector('.js-datepicker__apply-button');

        this.defaultValue = this.root.dataset.defaultValue? JSON.parse(this.root.dataset.defaultValue) : '';

        this.datepickerData = {};

        this.init();
    }

    handleUpdateDatepickerData = (date1, date2) => {
        this.datepickerData = {
            date: [date1, date2]
        };
    };

    addDataSentEvent() {
        this.root.dispatchEvent(new CustomEvent('data-sent', {
            detail: {
                datepickerData: this.datepickerData
            }
        }));
    }

    setClearButtonDisabledState() {
        const isDisabled = this.datepickerData.date ? false : true;

        this.clearButton.disabled = isDisabled;
    }

    handleManualApplyEvent = event => {
        if (Object.is(event.target, this.applyButton)) {
            this.addDataSentEvent();
        }

        if (Object.is(event.target, this.clearButton)) {
            this.datepickerData = {};
            this.addDataSentEvent();    
        }

        this.setClearButtonDisabledState();
    };

    init() {
        const lp = new Litepicker({
            element: this.root,
            parentEl: this.main,
            lang: 'ru',
            inlineMode: true,
            numberOfMonths: 1,
            singleMode: false,
            format: 'DD.MM.YYYY',
            startDate: this.defaultValue ? this.defaultValue[0] : null,     
            endDate: this.defaultValue ? this.defaultValue[1]: null,
            showTooltip: false,
            mobileFriendly: false,
            onSelect: this.handleUpdateDatepickerData,
            buttonText: {
                previousMonth: 'arrow_back',
                nextMonth: 'arrow_forward'
            }
        })

        if (this.defaultValue) {
            lp.setDateRange(this.defaultValue[0], this.defaultValue[1]);

            window.addEventListener('load', event => this.addDataSentEvent());
        }
 
        this.setClearButtonDisabledState();

        this.clearButton.addEventListener('click', event => {
            lp.clearSelection();
            this.handleManualApplyEvent(event);
        });
        this.applyButton.addEventListener('click', this.handleManualApplyEvent);
    }
};

function render() {
    const components = document.body.querySelectorAll('.js-datepicker');
    if (components.length > 0) {
        Array.from(components).map((node) => new Datepicker(node));
    };
};

render();