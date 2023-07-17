import { Component, OnDestroy } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Subscription } from 'rxjs';
import { DashboardService } from 'src/app/modules/feature/services/dashboard.service';

@Component({
  selector: 'app-yesterday-cycle-bar-chart',
  templateUrl: './yesterday-cycle-bar-chart.component.html',
  styleUrls: ['./yesterday-cycle-bar-chart.component.css']
})
export class YesterdayCycleBarChartComponent implements OnDestroy{
  series: any;
  chartData!: any;
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions!: Highcharts.Options;
  chartSubscription!: Subscription;

  constructor(private service: DashboardService) {}
  public ngAfterViewInit(): void {
     this.getData();
  }

  getData() {
    this.chartSubscription! = this.service.getYesterdayCycleCountBarData().subscribe((data: any) => {
      this.chartData = data;
      this.drawChart();
    })
  }

  private drawChart(): void {
    const data: any[] = [];
    Highcharts.chart('chart-column', {
      // colors: ['lightblue', 'orange'],
      // colors: ['#811010', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'],
      chart: {
        type: 'column',
        backgroundColor: {
          // linearGradient: [0, 0, 500, 500],
          // stops: [
          //   [0, 'rgb(255, 255, 255)'],
          //   [1, 'rgb(200, 200, 255)']
          // ]
        },
        polar: true,
      },
      title: {
        text: '',
      },
      credits: {
        enabled: false,
      },
      legend: {
        enabled: true,
        
      },
      yAxis: [{
        lineWidth: 1,
        title: {
            text: 'Cycle count'
        }
    },
  ],
    plotOptions: {
      
      column: {
        colorByPoint: true,
          zones: [{
              value: 300, // Values up to 10 (not including) ...
               color: '#28a745' // ... have the color blue.
           },{
              color: '#dc3545' // Values from 10 (including) and up have the color red!important
           }]
       },
      legend: {
        symbolHeight: 12,
        symbolWidth: 12,
        symbolRadius: 0
      },
      series: {
          marker: {
              symbol: 'circle'
          },
          states: {
            inactive: {
              enabled: false
            }
          },
          events: {
          }
      }
    },
      xAxis: {
        type: 'category',
        gridLineWidth: 1,
      },
      tooltip: {
        headerFormat: `<div>Cycle Count: {point.key}</div>`,
        pointFormat: `<div>{series.name}: {point.y}</div>`,
        shared: true,
        useHTML: true,
      },
      series: [{
        name: 'Wells',
        data: this.chartData,
        showInLegend: true,
      }
    ],
    } as any);

  }

  ngOnDestroy(): void {
      this.chartSubscription.unsubscribe();
  }
}
