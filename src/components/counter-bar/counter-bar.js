import './counter-bar.css';

import './../counter/counter.js';

class CounterBar {
    constructor(node) {
        this.root = node;
        this.counters = this.root.querySelectorAll('.js-counter');
        this.clearButton = this.root.querySelector('.js-counter-bar__clear-button');
        this.applyButton = this.root.querySelector('.js-counter-bar__apply-button');
        this.mode = this.root.dataset.mode;
        this.counterData = {};

        this.init();
    }

    addDataSentEvent() {
        this.root.dispatchEvent(new CustomEvent('data-sent', {
            detail: {
                counterData: this.counterData,
            }
        }));
    }

    addDataUpdatedEvent() {
        this.root.dispatchEvent(new CustomEvent('data-updated'));
    }

    addDataClearEvent() {
        Array.from(this.counters).forEach(counter => counter.dispatchEvent(new CustomEvent('counter-clear')));
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

        this.addDataUpdatedEvent();
    } 

    setCounterChangedEventListenter() {
        Array.from(this.counters).forEach((counter) => counter.addEventListener('counter-changed', this.handleUpdateCounterData));  
    }

    setClearButtonDisabledState() {
        const isDisabled = Object.values(this.counterData).reduce((isDisabled, data) => data.value > 0 ? isDisabled = false : isDisabled , true);

        this.clearButton.disabled = isDisabled;
    }

    handleManualApplyEvent = event => {
        if (Object.is(event.target, this.applyButton)) {
            this.addDataSentEvent();
        }

        if (Object.is(event.target, this.clearButton)) {
            this.addDataClearEvent();
            this.addDataSentEvent();      
        }

        this.setClearButtonDisabledState();
    };

    setDataUpdatedEventListener() {
        this.root.addEventListener('data-updated',  event => this.addDataSentEvent());
    }

    setManualApplyEventListeners() {
        window.addEventListener('load', event => {
            this.setClearButtonDisabledState();
            this.addDataSentEvent();
        })
        this.applyButton.addEventListener('click', this.handleManualApplyEvent);
        this.clearButton.addEventListener('click', this.handleManualApplyEvent);
    }
    
    init() {
        this.setCounterChangedEventListenter();

        if (Object.is(this.mode, 'manualApply')) {
            this.setManualApplyEventListeners();
        }
        if (Object.is(this.mode, 'autoApply')) {
            this.setDataUpdatedEventListener();
        }
    }
};

function render() {
    const components = document.body.querySelectorAll('.js-counter-bar');
    if (components.length > 0) {
        Array.from(components).map((node) => new CounterBar(node));
    };
};

render();