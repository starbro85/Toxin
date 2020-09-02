import Chart from "chart.js";

class PieChart {
    constructor(node) {
        this.root = node;
        this.container = this.root.querySelector('.js-pie-chart__container');
        this.canvas = this.root.querySelector('.js-pie-chart__canvas');
        this.counts = JSON.parse(this.root.dataset.counts).map((item) => Number(item));
        this.labels = JSON.parse(this.root.dataset.labels);
        this.colors = JSON.parse(this.root.dataset.colors);

        this._init();
    }

    _setCustomTooltip = (tooltipModel) => {
        let tooltipEl = this.container.querySelector('.js-pie-chart__tooltip');

        if (!tooltipEl) {
            tooltipEl = document.createElement('span');
            this.container.appendChild(tooltipEl);
            tooltipEl.classList.add('pie-chart__tooltip', 'js-pie-chart__tooltip');
        }

        if (tooltipModel.body) {
            const bodyLines = tooltipModel.body.map((bodyItem) => bodyItem.lines);
            const innerHtml = bodyLines.reduce((innerHTML, body) => innerHTML += body, '');

            tooltipEl.innerHTML = innerHtml;
        }

        if (tooltipModel.opacity === 0) {
            tooltipEl.style.opacity = 0;
            tooltipEl.style.zIndex = '-1';
            return;
        }

        tooltipEl.classList.remove('above', 'below', 'no-transform');

        if (tooltipModel.yAlign) {
            tooltipEl.classList.add(tooltipModel.yAlign);
        } 
        else {
            tooltipEl.classList.add('no-transform');
        }

        tooltipEl.style.zIndex = '1';
        tooltipEl.style.opacity = 1;
        tooltipEl.style.position = 'absolute';
        tooltipEl.style.left = tooltipModel.caretX + 'px';
        tooltipEl.style.top = tooltipModel.caretY + 'px';
    };

    _setChart() {
        new Chart(this.canvas, {
            type: 'pie',
            data: {
                labels: this.labels,
                datasets: [
                    {
                        label: "# of Votes",
                        data: this.counts,
                        backgroundColor: this.colors,
                        borderWidth: 2,
                        borderColor: 'white',
                        hoverBackgroundColor: this.colors,
                        hoverBorderColor: 'white',
                        hoverBorderWidth: 2
                    }
                ],
            },
            animation: {
                animateRotate: false
            },
            options: {
                maintainAspectRatio: false,
                legend: {
                   display: false
                }, 
                tooltips: {
                    enabled: false,
                    custom: this._setCustomTooltip
                }
            }
        });
    }

    _init() {
        this._setChart();
    }
}

export default function render () {
    const components = document.querySelectorAll('.js-pie-chart');

    if (components.length > 0) {
        Array.from(components).map((node) => new PieChart(node));
    };
}