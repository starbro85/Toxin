import './counter-bar.css';

import './../counter/counter.js';
import './../button/button.js';

class CounterBar {
    constructor(node) {
        this.root = node;
        this.counters = this.root.querySelectorAll('.js-counter');
        this.autoApply = Boolean(this.root.dataset.autoApply);
        if (!this.autoApply) {
            this.clearButton = this.root.querySelector('.js-counter-bar__clear-button');
            this.applyButton = this.root.querySelector('.js-counter-bar__apply-button');
        }
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

    addCountersClearEvent() {
        Array.from(this.counters).forEach(counter => counter.dispatchEvent(new CustomEvent('counter-clear')));
    }

    handleUpdateCounterData = event => {
        const counterName = event.detail.name;
        const counterValue = event.detail.value;
        const counterPlural = event.detail.plural;
        const isBound = event.detail.isBound;
        const boundCounterPlural = event.detail.boundPlural;
        const boundName = event.detail.boundName;

        if (isBound) {
            if (!this.counterData[boundName])
                this.counterData[boundName] = {
                    name: boundName,
                    isBound: isBound,
                    plural: boundCounterPlural,
                    values: {},
                    plurals: {}
                }
            this.counterData[boundName].plurals[counterName] = counterPlural;
            this.counterData[boundName].values[counterName] = counterValue;
            this.counterData[boundName].value = Object.values(this.counterData[boundName].values)
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

        this.root.dispatchEvent(new CustomEvent('data-updated'));
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
            this.addCountersClearEvent();
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

        this.autoApply === 'manualApply' ? this.setDataUpdatedEventListener() : this.setManualApplyEventListeners();
    }
};

function render() {
    const components = document.body.querySelectorAll('.js-counter-bar');
    if (components.length > 0) {
        Array.from(components).map((node) => new CounterBar(node));
    };
};

render();