import './../counter/counter.js';
import './counters-bar.css';

class CountersBar {
    constructor(node) {
        this.root = node;
        this.counters = this.root.querySelectorAll('.js-counter');
        this.buttonsBar = this.root.querySelectorAll('.js-counters-bar__footer');
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

    handleCounterValueDispatch = (event, data) => {
        this.root.dispatchEvent(new CustomEvent('counter-value-dispatch', {
            detail: {
                counterData: data,
            }
        }));
    };

    setCounterValueChangeEventListener() {
        Array.from(this.counters).forEach((counter) => counter.addEventListener('counter-value-change', event => {
            this.handleUpdateCounterData(event);
            if (Object.is(this.mode, 'autoApply')) {
                this.handleCounterValueDispatch(event, this.counterData);
            }
        }));  
    }

    init() {
        this.setCounterValueChangeEventListener();

        if (Object.is(this.mode, 'manualApply')) {
            this.buttonsBar.hidden = false;
            this.applyButton.addEventListener('click', event => {
                this.clearButton.disabled = false;
                this.clearButton.style.opacity = '1';
                this.handleCounterValueDispatch(event, this.counterData);
            });
            this.clearButton.addEventListener('click', event => {
                this.clearButton.disabled = true;
                this.clearButton.style.opacity = '0';
                this.handleCounterValueDispatch(event, {});
            })
        }
    }
};

function render() {
    const components = document.body.querySelectorAll('.js-counters-bar');
    if (components.length > 0) {
        Array.from(components).map((node) => new CountersBar(node));
    };
};

render();