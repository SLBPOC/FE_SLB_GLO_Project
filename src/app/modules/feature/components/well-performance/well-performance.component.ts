import { Component, AfterViewInit } from '@angular/core';
import * as Highcharts from 'highcharts';

// require('highcharts/modules/exporting')(Highcharts);

@Component({
  selector: 'app-well-performance',
  templateUrl: './well-performance.component.html',
  styleUrls: ['./well-performance.component.scss'],
})
export class WellPerformanceComponent implements AfterViewInit {
  public ngAfterViewInit(): void {}

  Highcharts: typeof Highcharts = Highcharts; // Highcharts, it's Highcharts

  updateFromInput: boolean = false;

  chartOptions: Highcharts.Options = {
    chart: {
      plotBackgroundColor: '',
      plotShadow: false,
      type: 'pie',
      height: (18 / 18) * 100 + '%', // 16:9 ratio
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: false,
        },
        showInLegend: true,
      },
    },
    legend: {
      layout: 'vertical',
      verticalAlign: 'bottom',
      align: 'center',
      symbolHeight: 10,
      symbolRadius: 1,
      itemMarginTop: -40,
      itemMarginBottom: 10,
    },
    title: {
      text: `
      <div class="d-flex justify-content-center">300 Wells</div>
      `,
      align: 'center',
      verticalAlign: 'middle',
      y: -3,
      x: 0,
    },
    series: [
      {
        type: 'pie',
        startAngle: -110,
        endAngle: 110,
        size: '90%',
        innerSize: '90%',
        colors: ['yellow', 'green', 'red'],
        data: [
          {
            name: 'Under pumping (70 wells)',
            y: 70,
          },
          {
            name: 'Optional pumping (160 wells)',
            y: 160,
          },
          {
            name: 'Over pumping (70 wells)',
            y: 70,
          },
        ],
      },
    ],
  };
  chartCore: any;
  //Demonstrate chart instance
  logChartInstance(chart: Highcharts.Chart) {
    console.log('Chart instance: ', chart);
    this.chartCore = chart;
  }
  loadFullScreen() {
    let f = this.chartCore.fullscreen.toggle();
  }
  updateInputChart() {
    this.chartOptions = this.chartOptions;
  }

  seriesTypes: { [key: string]: string } = {
    line: 'column',
    column: 'scatter',
    scatter: 'spline',
    spline: 'line',
  };

  toggleSeriesType(index: number = 0) {
    if (this.chartOptions && this.chartOptions.series) {
      this.chartOptions.series[index].type = this.seriesTypes[
        this.chartOptions.series[index].type || 'pie'
      ] as 'column' | 'scatter' | 'spline' | 'pie';
      // nested change - must trigger update
      this.updateFromInput = true;
    }
  }
}
