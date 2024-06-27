import { containerless, bindable, bindingMode } from "aurelia-framework";
import * as ChartJs from "chart.js";
import { CLIENT_RENEG_LIMIT } from "tls";
import { logger } from "../logger";

@containerless()
export class Chart {
  container;
  myChart;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) data;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) labels;
  @bindable type;

  constructor() {}

  attached() {
    logger.info('chartData', this.data);
    logger.info('chartLabels', this.labels);
    logger.info('chartType', this.type);

    this.myChart = new ChartJs(this.container, {
      type: this.type,
      data: {
        labels: this.labels,
        datasets: [
          {
            label: "# of Votes",
            data: this.data,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)"
            ],
            borderColor: [
              "rgba(255,99,132,1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)"
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });
  }
}
