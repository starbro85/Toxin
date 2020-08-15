import './datepicker.css';

export class Datepicker {
    constructor(node) {
        this.root = node;
        this.initValue = this.root.dataset.initValue
            ? JSON.parse(this.root.dataset.initValue)
            : '';
        this.lang = this.root.dataset.lang;

        this.init();
    }

    init() {

    }
}
