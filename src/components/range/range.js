import './range.css';

import noUiSlider from 'nouislider';
import 'nouislider/distribute/nouislider.min.css';
import wNumb from 'wnumb';

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
        noUiSlider.cssClasses.base += ' range__base';
        noUiSlider.cssClasses.connect += ' range__connect';
        noUiSlider.cssClasses.handle += ' range__handle';

        noUiSlider.create(this.slider, {
            connect: true,
            start: [Number(this.defaultValueRange.minValue), Number(this.defaultValueRange.maxValue)],
            step: Number(this.step),
            margin: Number(this.margin),
            range: {
                'min': Number(this.valueRange.minValue),
                'max': Number(this.valueRange.maxValue)
            },
            format: wNumb({
                decimals: 0,
                thousand: ' ',
                suffix: '₽'
            })
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