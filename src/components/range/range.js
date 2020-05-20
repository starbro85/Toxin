import './range.css';

import noUiSlider from 'nouislider';

class Range {
    constructor(node) {
        this.root = node;
        this.slider = this.root.querySelector('.js-range__slider');
        this.input = this.root.querySelector('.js-range__input');
        this.valueRange = JSON.parse(this.slider.dataset.valueRange);
        this.defaultValueRange = JSON.parse(this.slider.dataset.defaultValueRange);
        this.step = this.slider.dataset.step;
        this.margin = this.slider.dataset.margin;
   
        this.init();
    }

    createSlider() {
        noUiSlider.create(this.slider, {
            connect: true,
            start: [Number(this.defaultValueRange.minValue), Number(this.defaultValueRange.maxValue)],
            step: Number(this.step),
            margin: Number(this.margin),
            range: {
                'min': Number(this.valueRange.minValue),
                'max': Number(this.valueRange.maxValue)
            },
            cssPrefix: 'range__',
            format: {
                to: function (value) {
                    return value  + '₽';
                },
                from: function (value) {
                    return Number(value.replace('-', ''));
                }
            }
        });
    }

    handleSliderUpdate = (values, _) => {
        this.input.value = values.reduce((result, value) => `${result}${value} - `, '').slice(0, -2);
    }

    setSliderUpdateEventListener() {
        this.slider.noUiSlider.on('update', this.handleSliderUpdate);
    }

    init() {
        this.createSlider();
        this.setSliderUpdateEventListener();
    }
};

function render() {
    const components = document.body.querySelectorAll('.js-range');
    if (components.length > 0) {
        Array.from(components).map((node) => new Range(node));
    };
};

render();