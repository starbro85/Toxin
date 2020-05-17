import './../counter/counter.js';
import './counters-bar.css';

class CountersBar {
    constructor(node) {
        this.root = node;
        this.counters = this.root.querySelectorAll('.js-counter');
        this.clearButton = this.root.querySelector('.js-counters-bar__clear-button');
        this.applyButton = this.root.querySelector('.js-counters-bar__apply-button');
        this.mode = this.root.dataset.mode;
        this.counterData = {};

        this.init();
    }

    handleUpdateCounterData = event => {
        const counterName = event.detail.name;
        const counterPlural = event.detail.plural;
        const counterValue = event.detail.value;
        const isBound = event.detail.isBound;
        const boundName = event.detail.boundName;

        if (isBound) {
            if (!this.counterData[boundName])
                this.counterData[boundName] = {
                    name: boundName,
                    isBound: isBound,
                    plural: counterPlural,
                    boundValues: {}
                }
            this.counterData[boundName].boundValues[counterName] = counterValue;
            this.counterData[boundName].value = Object.values(this.counterData[boundName].boundValues)
                                                      .reduce((sumValue, value) => sumValue + value, 0);
        }

        else {
            this.counterData[counterName] = {
                name: counterName,
                plural: counterPlural,
                value: counterValue,
                isBound: isBound
            }
        }
    }  

    addDataSentEvent(data) {
        this.root.dispatchEvent(new CustomEvent('data-sent', {
            detail: {
                counterData: data,
            }
        }));
    };

    addDataClearEvent() {
        Array.from(this.counters).forEach(counter => counter.dispatchEvent(new CustomEvent('counter-clear')));
    }

    setClearButtonState() {
        const clearButtonIsDisabled = Object.values(this.counterData).reduce((isDisabled, data) => data.value > 0 ? isDisabled = false : isDisabled, true);
        this.clearButton.disabled = clearButtonIsDisabled;
    }

    handleManualControlEvent = event => {
        if (Object.is(event.target, this.applyButton)) {
            this.addDataSentEvent(this.counterData);
        }

        if (Object.is(event.target, this.clearButton)) {
            this.counterData = {};
            this.addDataSentEvent(this.counterData);
            this.addDataClearEvent();
        }

        this.setClearButtonState()
    }

    counterValueSubmit() {
        if (Object.is(this.mode, 'autoApply')) {
            this.addDataSentEvent(this.counterData);
        }

        if (Object.is(this.mode, 'manualApply')) {
            this.applyButton.addEventListener('click',this.handleManualControlEvent);
            this.clearButton.addEventListener('click', this.handleManualControlEvent);
        }
    }

    setCounterChangedEventListenter() {
        Array.from(this.counters).forEach((counter) => counter.addEventListener('counter-changed',  event => {
            this.handleUpdateCounterData(event);
            this.counterValueSubmit();
        }));  
    }

    init() {


        this.setCounterChangedEventListenter();
    }
};

function render() {
    const components = document.body.querySelectorAll('.js-counters-bar');
    if (components.length > 0) {
        Array.from(components).map((node) => new CountersBar(node));
    };
};

render();