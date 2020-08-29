import './datepicker.css';

import datepickerjs from 'Datepicker.js';

export class Datepicker {
    constructor(node) {
        this.root = node;
        this.initValue = this.root.dataset.initValue
            ? JSON.parse(this.root.dataset.initValue)
            : '';
        this.lang = this.root.dataset.lang;

        this.i18n = require('./i18n.json')[this.lang];

        this._init();
    }

    _getDatepickerData(element, datepicker) {
        this.calendar = element.querySelector('.datepicker__calendar');
        this.dayCells = element.querySelectorAll('.datepicker__day:not(.is-otherMonth)');
        this.todayCell = element.querySelector('.datepicker__day.is-today');
        this.selectedCells = element.querySelectorAll('.datepicker__day.is-selected');
        this.selectedDates = datepicker.getDate();
    }

    _setKeyboardNavigation(datepicker) {
        this.calendar.addEventListener('keyup', (event) => {
            if (event.code === 'Space' || event.code === 'Enter') {
                event.preventDefault();
                this.selectedCells[0] ? this.selectedCells[0].focus() : this.todayCell ? this.todayCell.focus() : this.dayCells[0].focus();
            }
        })

        this.dayCells.forEach((cell, index) => {
            cell.addEventListener('keydown', (event) => {
                event.preventDefault();
                event.stopPropagation();

                switch (event.code) {
                    case 'ArrowDown':      
                        if (this.dayCells[index + 7]) {
                            if (!this.dayCells[index + 7].classList.contains('is-disabled')){
                                this.dayCells[index + 7].focus();
                            }
                        } else {
                            datepicker.next();
                            datepicker.render();
                            this.dayCells[0].focus();
                        }
                        break;

                    case 'ArrowUp': 
                        if (this.dayCells[index - 7]) {
                            if (!this.dayCells[index - 7].classList.contains('is-disabled')) {
                                this.dayCells[index - 7].focus();
                            }
                        } else {
                            datepicker.prev();
                            datepicker.render();
                            this.dayCells[this.dayCells.length - 1].focus();
                        }
                        break;

                    case 'ArrowRight': 
                        if (this.dayCells[index + 1]) {
                            if (!this.dayCells[index + 1].classList.contains('is-disabled')) {
                                this.dayCells[index + 1].focus();
                            }
                        } else {
                            datepicker.next();
                            datepicker.render();
                            this.dayCells[0].focus();
                        }
                        break;

                    case 'ArrowLeft': 
                        if (this.dayCells[index - 1]) {
                            if (!this.dayCells[index - 1].classList.contains('is-disabled')) {
                                this.dayCells[index - 1].focus();
                            }
                        } else {
                            datepicker.prev();
                            datepicker.render();
                            this.dayCells[this.dayCells.length - 1].focus();
                        }
                        break;
                }
            });

            cell.addEventListener('keyup', (event) => {    
                event.preventDefault();
                event.stopPropagation();

                switch (event.code) {
                    case 'Escape':
                        this.calendar.focus();
                        break;

                    case 'Enter':
                    case 'Space':   
                        const date = new Date(Number(cell.dataset.day));

                        if (this.selectedDates.length > 1) {
                            datepicker.setDate(date);
                        } else {
                            datepicker.toggleDate(date, true);
                        }
                        
                        datepicker.render();

                        if (this.selectedCells.length > 1) {
                            this.calendar.focus();
                        } else {
                            this.selectedCells[0].focus();
                        }
                        break;
                }
            })
        })
    };

    _addStartEndRangeClasses() {
        const startTimestamp = new Date(this.selectedDates[0]).getTime();
        const endTimestamp = new Date(this.selectedDates[this.selectedDates.length - 1]).getTime();

        if (this.selectedCells.length && startTimestamp && Number(this.selectedCells[0].dataset.day) === startTimestamp) {
            this.selectedCells[0].classList.add('is-startRange')
        }
        if (this.selectedCells.length && endTimestamp && Number(this.selectedCells[this.selectedCells.length - 1].dataset.day) === endTimestamp) {
            this.selectedCells[this.selectedCells.length - 1].classList.add('is-endRange');
        }
    }

    _sendDates = (dates) => {
        this.root.dispatchEvent(new CustomEvent('datepicker-date-sent', {
            detail: {
                dates
            }
        }))
    }

    _init() {
        const datepicker = new datepickerjs(this.root, {
            inline: true,
            ranged: true,
            openOn: this.initValue ? 'first' : 'today',
            weekStart: this.i18n.WEEK_START,
            min: Date.now() - 1000 * 60 * 60 * 24,
            onChange: (date) => this._sendDates([date[0], date[date.length - 1]]),
            i18n: {
                months: this.i18n.MONTHS,
                weekdays: this.i18n.WEEKDAYS
            },
            templates: {
                header: [
                    '<div class="datepicker__header">',
                        `<button class="datepicker__prev<%= (hasPrev) ? "" : " is-disabled" %>" title="${this.i18n.PREVIOUS_MONTH}" aria-label="${this.i18n.PREVIOUS_MONTH}" data-prev>arrow_back</button>`,
                        '<h3 class="datepicker__title" id="datepicker-title">',
                            '<span><%= month %></span>',
                            '&nbsp;',
                            '<span><%= year %></span>',
                        '</h3>',
                        `<button class="datepicker__next<%= (hasNext) ? "" : " is-disabled" %>" title="${this.i18n.NEXT_MONTH}" aria-label="${this.i18n.NEXT_MONTH}" data-next>arrow_forward</button>`,
                  '</div>'
                ].join(''),
                calendar: [
                    '<table class="datepicker__calendar" tabindex="0" role="grid" aria-labelledby="datepicker-title">',
                        '<thead>',
                            '<tr class=datepicker__row>',
                            '<% weekdays.forEach(function(name) { %>',
                                '<th class=datepicker__weekday><abbr title=<%= name.full %>><%= name.abbr %></abbr></th>',
                            '<% }); %>',
                            '</tr>',
                        '</thead>',
                        '<tbody>',
                            '<% days.forEach(function(day, i) { %>',
                            '<%= (i % 7 == 0) ? "<tr class=datepicker__row>" : "" %>',
                                '<%= renderDay(day) %>',
                            '<%= (i % 7 == 6) ? "</tr>" : "" %>',
                            '<% }); %>',
                        '</tbody>',
                    '</table>',
                  ].join(''),
                day: [
                    '<% classNames.push("datepicker__day"); %>',
                    `<td class="<%= classNames.join(" ") %>" data-day="<%= timestamp %>" tabindex="-1" title="<%= new Intl.DateTimeFormat('${this.lang}', {month: 'long', day: 'numeric'}).format(timestamp) %>" role="gridcell" aria-label="<%= new Intl.DateTimeFormat("${this.lang}", {month: "long", day: "numeric"}).format(timestamp) %>" aria-selected="<%= isSelected ? "true" : "false" %>">`,
                        '<%= daynum %>',
                    '</td>'
                ].join('')
            }
        });

        datepicker.set({
            onRender: (element) => {
                this._getDatepickerData(element, datepicker);
                this._addStartEndRangeClasses(element, datepicker);
                this._setKeyboardNavigation(datepicker)
            }
        })

        if (this.initValue) {
            datepicker.setDate(this.initValue);
            datepicker.goToDate(this.initValue[0]);

            this._sendDates(this.initValue);
        }

        this.root.addEventListener('datepicker-clear', (event) => {
            datepicker.setDate('');
            datepicker.render()
        })
    }
}
