import { Counter } from './counter/counter.js';
import { TextField } from '../text-field/text-field.js';
import { Expander } from '../../globals/helpers/expander';

const normalizeStr = require('../../globals/helpers/normalizeStr.js');
const pluralize = require('../../globals/helpers/pluralize.js');

class QuantityDropdown {
    constructor(node) {
        this.root = node;
        this.textField = this.root.querySelector('.js-quantity-dropdown__text-field');
        this.button = this.root.querySelector('.js-quantity-dropdown__button')
        this.container = this.root.querySelector('.js-quantity-dropdown__container')
        this.counters = this.root.querySelectorAll('.js-counter');
        this.inputs = this.root.querySelectorAll('.js-counter__input');
        this.autoApply = this.root.hasAttribute('data-auto-apply');
        this.lang = this.root.dataset.lang;
        this.countersData = {};

        this._init();
    }
      
    _setCounterChangeEventListeners() {
        this.counters.forEach(counter => counter.addEventListener('counter-changed', (event) => {
            const name = event.detail.name;
            const value = event.detail.value;
            const plural = event.detail.plural;
            const isBound = event.detail.isBound;
            const boundplural = event.detail.boundPlural;
            const boundName = event.detail.boundName;

            if (isBound) {
                if (!this.countersData[boundName])
                    this.countersData[boundName] = {
                        name: boundName,
                        isBound: true,
                        plural: boundplural,
                        originData: {}
                    }
                this.countersData[boundName].originData[name] = { name };
                this.countersData[boundName].originData[name].plural = plural;
                this.countersData[boundName].originData[name].value = value;
                this.countersData[boundName].value = Object.values(this.countersData[boundName].originData)
                                                        .reduce((sumValue, data) => sumValue + data.value, 0);
            }

            else {
                this.countersData[name] = {
                    name: name,
                    plural: plural,
                    value: value,
                    isBound: false
                }
            }
        })); 
    }

    _getInputSizeInChar() {
        const style = getComputedStyle(this.textField);
        const inputWidth = parseInt(style.width) - 35;
        const inputSizeInChar = Math.floor(inputWidth * 0.125);

        return inputSizeInChar;
    }

    _placehodlerStringMaker = (str, item) => (item.value !== 0) ? `${str} ${item.value} ${pluralize(this.lang, item.plural, item.value)},` : `${str}`

    _jsonObjStringMaker = (str, item) => (item.value !== 0) ? `${str} "${item.name}": "${item.value}",` : `${str}`

    _getStringFromCounters(counters, stringMaker, displayOrigin) {
        const str = Object
            .values(counters)
            .reduce((str, counter) => {
                if (counter.isBound && displayOrigin) {
                    return `${str} ${this._getStringFromCounters(counter.originData, stringMaker, displayOrigin)},`;
                } else {
                    return stringMaker(str, counter);
                }
            }, '')
            .slice(1, -1);

        return str;
    }

    _setTextFieldPlaceholder() {
        const placeholder = normalizeStr(this._getStringFromCounters(this.countersData, this._placehodlerStringMaker, false), this._getInputSizeInChar());

        new TextField(this.textField).setPlaceholder(placeholder);
    }

    _setTextFieldTitle() {
        const title = this._getStringFromCounters(this.countersData, this._placehodlerStringMaker, true);

        new TextField(this.textField).setTitle(title);
    }

    _setTextFieldValue() {
        const value = this._getStringFromCounters(this.countersData, this._jsonObjStringMaker, true);

        new TextField(this.textField).setValue(value ? `{${value}}` : '');
    }

    _updateTextField() {
        this._setTextFieldPlaceholder();
        this._setTextFieldValue();
        this._setTextFieldTitle();
    }

    _setClearButtonDisabledState = () => {
        const counters = Object.values(this.countersData);
        const isDisabled = counters.reduce((acc, counter) => { 
            if (counter.value) { acc = false; }

            return acc;
        }, true);

        this.clearButton.disabled = isDisabled;
    }

    _handleManualApply = (event) => {
        if (event.target === this.applyButton) { this._updateTextField(); }

        if (event.target === this.clearButton) {
            this.counters.forEach((counter) => counter.dispatchEvent(new CustomEvent('counter-clear')));

            this._updateTextField();
        }

        this._setClearButtonDisabledState();
    }

    _setManualApply() {
        this.applyButton = this.root.querySelector('.js-quantity-dropdown__apply-button');
        this.clearButton = this.root.querySelector('.js-quantity-dropdown__clear-button');

        this.applyButton.addEventListener('click', this._handleManualApply);
        this.clearButton.addEventListener('click', this._handleManualApply);

        this._setClearButtonDisabledState();
    }

    _setAutoApply() {
        this.counters.forEach((counter) => counter.addEventListener('counter-changed', (event) => this._updateTextField()));
    }

    _setCounters() {
        this.counters.forEach((counter) => new Counter(counter));
    }

    _setExpander() {
        new Expander(this.root, {
            control: this.button,
            toggleClass: 'quantity-dropdown_expanded', 
            trapFocus: true,
            outsideClickCollapse: true,
            container: this.container,
            disableHiddenElements: true
        });
    }

    _setApplyMode = () => this.autoApply ? this._setAutoApply() : this._setManualApply();
    
    _init() {
        this._setCounterChangeEventListeners();
        this._setCounters();
        this._setApplyMode();
        this._updateTextField();
        this._setExpander();
    }
}


export default function render () {
    const components = document.querySelectorAll('.js-quantity-dropdown');

    if (components.length > 0) {
        Array.from(components).map((node) => new QuantityDropdown(node));
    };
}