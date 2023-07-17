import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-yesterday-percent-run',
  templateUrl: './yesterday-percent-run.component.html',
  styleUrls: ['./yesterday-percent-run.component.scss']
})
export class YesterdayPercentRunComponent implements OnInit{
  highcharts = Highcharts;
  pieChartOptions!: Highcharts.Options;
  ngOnInit(): void {
    this.getPieChart();
  }

getPieChart()
  {
    
    this.pieChartOptions = {
      chart : {
        plotShadow: false
     },
     title : {
        text: ''   
     },
     tooltip : {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
     },
     plotOptions : {
        pie: {
           allowPointSelect: true,
           cursor: 'pointer',
     
           dataLabels: {
              enabled: false           
           },
     
           showInLegend: true
        }
     },
     legend: {
      symbolHeight: 12,
      symbolWidth: 12,
      symbolRadius: 0
    },
     series : [{
        type: 'pie',
        name: 'yesterday percent',
        data: [
          {
            id: '1',
            name: 'Group 1 (75-90)',
            y: 30.0,
            sliced: false,
            selected: false,
            color: 'brown',            
          },
          {
            id: '2',
            name: 'Group 2 (50-75)',
            y: 35.0,
            sliced: false,
            selected: false,
            color: 'yellow',
          },
          {
            id: '3',
            name: 'Group 3 (<50)',
            y: 35.0,
            sliced: false,
            selected: false,
            color: 'orange'
          },
          
        ]
     }]
    }
}
}
