import './doughnut-chart.css';

import Chart from "chart.js";

const render = require("./../../globals/helpers/render.js");

class doughnutChart {
    constructor(node) {
        this.root = node;
        this.container = this.root.querySelector('.js-doughnut-chart__container');
        this.canvas = this.root.querySelector('.js-doughnut-chart__canvas');
        this.counts = JSON.parse(this.root.dataset.counts).map((item) => Number(item));
        this.labels = JSON.parse(this.root.dataset.labels);
        this.colors = JSON.parse(this.root.dataset.colors);

        this.init();
    }

    setCustomTooltip = (tooltipModel) => {
        let tooltipEl = this.container.querySelector('.js-doughnut-chart__tooltip');

        if (!tooltipEl) {
            tooltipEl = document.createElement('span');
            this.container.appendChild(tooltipEl);
            tooltipEl.classList.add('doughnut-chart__tooltip', 'js-doughnut-chart__tooltip');
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

    init() {
        new Chart(this.canvas, {
            type: 'doughnut',
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
                cutoutPercentage: 88,
                legend: {
                   display: false
                }, 
                tooltips: {
                    enabled: false,
                    custom: this.setCustomTooltip
                }
            }
        });
    }
}

render(".js-doughnut-chart", doughnutChart);
