import './room-detail.css';

import '../review/review.js';
import '../feature-list/feature-list.js';
import '../pie-chart/pie-chart.js';
import '../bullet-list/bullet-list.js';
import '../form-booking/form-booking.js';

import { PieChart } from '../pie-chart/pie-chart.js';
import { Review } from '../review/review.js';
import { FormBooking } from '../form-booking/form-booking.js';

export class RoomDetail {
    constructor(node) {
        if (node) {
            this.root = node;
        }
    }

    _init() {
        new PieChart().render(this.root);
        new Review().render(this.root);
        new FormBooking().render(this.root);
    }

    render(parent) {
        const components = parent ? parent.querySelectorAll('.js-room-detail') : document.querySelectorAll('.js-room-detail');

        if (components.length > 0) {
            Array.from(components).map((node) => new RoomDetail(node)._init());
        };
    }
}