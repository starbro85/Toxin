import './datepicker.css';

import moment from 'moment';
moment.locale('ru');

import romeDatepicker from '@bevacqua/rome';
romeDatepicker.use(moment);


class Datepicker {
    constructor(node) {
        this.root = node;

        this.init();
    }

    init() {
        new romeDatepicker(this.root, {
            time: false,
            dayFormat: 'D',
            "styles": {
                "next":             "datepicker__next-button",
                "back":             "datepicker__prev-button",
                "date":             "datepicker__container",
                "month":            "datepicker__calendar",
                "monthLabel":       "datepicker__label",
                "dayTable":         "datepicker__table",
                "dayHead":          "datepicker__heading",
                "dayHeadElem":      "datepicker__cell datepicker__cell_heading",
                "dayBody":          "datepicker__body",
                "dayRow":           "datepicker__row",
                "dayBodyElem":      "datepicker__cell",
                "dayPrevMonth":     "datepicker__cell_prev",
                "dayNextMonth":     "datepicker__cell_next",
                "selectedDay":      "datepicker__cell_selected",
                "dayDisabled":      "datepicker__cell_disabled",
                "dayConcealed":     "datepicker__cell_concealed",      
            },
        })
    }
};

function render() {
    const components = document.body.querySelectorAll('.js-datepicker');
    if (components.length > 0) {
        Array.from(components).map((node) => new Datepicker(node));
    };
};

render();