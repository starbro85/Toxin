import './slider.css';

import noUiSlider from 'nouislider';
import 'nouislider/distribute/nouislider.min.css';
import wNumb from 'wnumb';

const render = require('./../../globals/helpers/render.js');

class Slider {
    constructor(node) {
        this.root = node;
        this.range = this.root.querySelector('.js-slider__range');
        this.input = this.root.querySelector('.js-slider__input');

        this.rangeData = {
            range: {
                'min': Number(JSON.parse(this.range.dataset.range)[0]),
                'max': Number(JSON.parse(this.range.dataset.range)[1])
            },
            initValue: JSON.parse(this.range.dataset.initValue),
            step: Number(this.range.dataset.step),
            margin: Number(this.range.dataset.margin)
        }
   
        this.init();
    }

    updateInputValue = values => {
        const inputValue = values.reduce((result, value) => `${result}${value} - `, '').slice(0, -2);

        this.input.value = inputValue;
    }

    createSlider() {
        noUiSlider.cssClasses.base += ' slider__base';
        noUiSlider.cssClasses.connect += ' slider__connect';
        noUiSlider.cssClasses.handle += ' slider__handle';

        noUiSlider.create(this.range, {
            connect: true,
            start: this.rangeData.initValue,
            step: this.rangeData.step,
            margin: this.rangeData.margin,
            range: this.rangeData.range,
            format: wNumb({
                decimals: 0,
                thousand: ' ',
                suffix: '₽'
            })
        });

        this.range.noUiSlider.on('update', this.updateInputValue);
    }

    init() {
        this.createSlider();
    }
};

render('.js-slider', Slider);