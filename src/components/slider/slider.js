import './slider.css';

import noUiSlider from 'nouislider';
import 'nouislider/distribute/nouislider.min.css';

const currencyFormat = require('../../globals/helpers/currencyFormat.js');

export class Slider {
    constructor(node) {
        if(node) {
            this.root = node;
            this.range = this.root.querySelector('.js-slider__range');
            this.input = this.root.querySelector('.js-slider__input');
            this.lang = this.range.dataset.lang,

            this.i18n = require('./i18n.json')[this.lang];

            this.rangeData = {
                range: {
                    'min': Number(JSON.parse(this.range.dataset.range)[0]),
                    'max': Number(JSON.parse(this.range.dataset.range)[1])
                },
                initValue: JSON.parse(this.range.dataset.initValue),
                step: Number(this.range.dataset.step),
                margin: Number(this.range.dataset.margin)
            }
        }
    }

    _updateInputValue = (values) => {
        const inputValue = values.reduce((result, value) => `${result}${value} - `, '').slice(0, -2);

        this.input.value = inputValue;
    }

    _setCustomClasses() {
        noUiSlider.cssClasses.base += ' slider__base';
        noUiSlider.cssClasses.connect += ' slider__connect';
        noUiSlider.cssClasses.handle += ' slider__handle js-slider__handle';   
        noUiSlider.cssClasses.tooltip += ' slider__tooltip';
    }

    _setA11lyToHandles() {
        const { RANGE_FROM, RANGE_TO } = this.i18n;
        const handles = this.root.querySelectorAll('.js-slider__handle');

        handles[0].setAttribute('aria-label', RANGE_FROM);
        handles[1].setAttribute('aria-label', RANGE_TO);
    }

    _init() {
        this._setCustomClasses();

        const { CURRENCY } = this.i18n;

        noUiSlider.create(this.range, {
            connect: true,
            start: this.rangeData.initValue,
            step: this.rangeData.step,
            margin: this.rangeData.margin,
            range: this.rangeData.range,
            tooltips: true,
            format: {
                to: (value) => currencyFormat(this.lang, CURRENCY, value),
                from: (value) => Number(value.replace(' - ', ''))
            }
        });

        this.range.noUiSlider.on('update', this._updateInputValue);

        this._setA11lyToHandles();
    }

    render(parent) {
        const components = parent ? parent.querySelectorAll('.js-slider') : document.querySelectorAll('.js-slider');
        
        if (components.length > 0) {
            Array.from(components).map((node) => new Slider(node)._init());
        };
    }
}

