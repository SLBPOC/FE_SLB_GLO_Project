import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Highcharts from 'highcharts';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ModalContentComponent } from './components/modal-content/modal-content.component';
import { DashboardService } from '../../services/dashboard.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-yesterday-cycle-count',
  templateUrl: './yesterday-cycle-count.component.html',
  styleUrls: ['./yesterday-cycle-count.component.scss']
})
export class YesterdayCycleCountComponent implements OnInit, OnDestroy {
  bsModalRef?: BsModalRef;
  constructor(private modalService: BsModalService, private service: DashboardService) {}
  chartData!: any;
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions!: Highcharts.Options;
  chartSubscription!: Subscription;

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.chartSubscription! = this.service.getYesterdayCycleCountData().subscribe((data: any) => {
      this.chartData = data;
      this.drawChart();
    })
  }

  openModalComponent(groupId: any, groupName: any) {
    this.bsModalRef = this.modalService.show(ModalContentComponent, 
      {initialState: {
        title: 'Chart', 
        modalData: {
          groupId: groupId,
          groupName: groupName
        }
      }, 
      class: 'modal-lg'
    });
    this.bsModalRef.content.closeBtnName = 'Close';
  }

  drawChart() {

    this.chartOptions = {
      chart: {
        plotShadow: true,
        renderTo: 'container'
      },
      title: {
        text: ``,
        style: { fontSize: '16px', color: '#333' }
      },
      tooltip: {
        pointFormat: `
        <div style = "font-size: 12px; font-weight: bold; color: #333">
        Group ID: <b>({point.id})</b> 
        <br> Group Name: {point.name} 
        <br> {series.name}: <b>{point.percentage:.1f}%</b> 
        </div>
        `
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            // enabled: true, // enable true for lines around pie chart to show details
            enabled: false,
          },
          showInLegend: true,
  
        },
        series: {
          events: {
            click: (e: any) => {
              this.openModalComponent(e.point.options.id, e.point.options.name);
            }
          }
        }
      },
      legend: {
        symbolHeight: 12,
        symbolWidth: 12,
        symbolRadius: 0
      },
      series: [{
        type: 'pie',
        name: `Yesterday's Cycle Count`,
        data: this.chartData,
      }]
    };
  }

  ngOnDestroy(): void {
      this.chartSubscription.unsubscribe();
  }
}
