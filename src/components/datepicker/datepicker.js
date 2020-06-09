import './datepicker.css';

import Litepicker from 'litepicker/dist/js/main.nocss';

class Datepicker {
    constructor(node) {
        this.root = node;
        this.main = this.root.querySelector('.js-datepicker__main');
        this.isRange = JSON.parse(this.root.dataset.isRange);
        this.mode = this.root.dataset.mode;
        this.datepickerData = {};

        if (this.mode === 'manual') {
            this.clearButton = this.root.querySelector('.js-datepicker__clear-button');
            this.applyButton = this.root.querySelector('.js-datepicker__apply-button');
        }

        this.init();
    }

    addDataUpdatedEvent() {
        this.root.dispatchEvent(new CustomEvent('data-updated'));
    }

    handleUpdateDatepickerData = (date1, date2) => {
        this.datepickerData.date = this.isRange ? [date1, date2] : date1;

        this.addDataUpdatedEvent()
    };

    addDataSentEvent() {
        this.root.dispatchEvent(new CustomEvent('data-sent', {
            detail: {
                datepickerData: this.datepickerData,
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
            this.datepickerData.date = this.isRange ? ['', ''] : '';
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
            singleMode: !this.isRange,
            showTooltip: false,
            mobileFriendly: true,
            buttonText: {
                previousMonth: 'arrow_back',
                nextMonth: 'arrow_forward'
            },
            onSelect: this.handleUpdateDatepickerData
        })


        if (this.mode === 'manual') {
            this.setClearButtonDisabledState();

            this.clearButton.addEventListener('click', event => {
                lp.clearSelection();
                this.handleManualApplyEvent(event);
            });
            this.applyButton.addEventListener('click', this.handleManualApplyEvent);
        }
        else {
            this.root.addEventListener('data-updated', event => this.addDataSentEvent());
        }
    }
};

function render() {
    const components = document.body.querySelectorAll('.js-datepicker');
    if (components.length > 0) {
        Array.from(components).map((node) => new Datepicker(node));
    };
};

render();