import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';
// require('highcharts/modules/exporting')(Highcharts);

@Component({
  selector: 'app-classification-summary',
  templateUrl: './classification-summary.component.html',
  styleUrls: ['./classification-summary.component.scss']
})
export class ClassificationSummaryComponent {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    title:{
      text:''
  },
    chart: {
      plotShadow: true,
      renderTo: 'container',
    },

    xAxis: {
      categories: ['L1', 'L2', 'L3', 'L4', 'L5', 'L6'],
      title: {
        text: 'Load Line',
      },
    },
  
    yAxis: {
      allowDecimals: false,

      min: 100,
      title: {
        text: 'Axis Title',
      },
    },

    tooltip: {
      pointFormat:
        '{series.name}: <b>{point.y}</b> ({point.percentage:.1f}%)<br/>',
    },

    plotOptions: {
      column: {
        stacking: 'normal',
        allowPointSelect: true,
      },
    },
    legend: {
      symbolHeight: 12,
      symbolWidth: 12,
      symbolRadius: 0,
    },

    series: [
       
      { 
        name: "Flat Lining",
        data: [40, 55, 30, 65, 55, 30],
        type: 'column',
        color: '#E76E3C',
        pointWidth: 40
      },
      {
        name: "Tagging",
        data: [40, 55, 30, 65, 55, 30],
        type: 'column',
        color: '#90C3DC',
        pointWidth: 40
      },
      {
        name: 'Fluid Pound',
        data: [40, 55, 30, 65, 55, 30],
        type: 'column',
        color: '#F06292',
        pointWidth: 40
      },
      {
        name: 'Gas Interface',
        data: [40, 55, 30, 65, 55, 30],
        type: 'column',
        color: '#3F51B5',
        pointWidth: 40
      },
      {
        name: 'Distorted',
        data: [40, 55, 30, 65, 55, 30],
        type: 'column',
        color: '#28A228',
        pointWidth: 40
      },
      {
        name: 'Normal',
        data: [40, 55, 30, 65, 55, 30],
        type: 'column',
        color: '#AD1457',
        pointWidth: 40
      },
    ],
  };
}
