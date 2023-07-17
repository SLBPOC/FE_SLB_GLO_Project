import { Component, ViewChild ,Injectable} from '@angular/core';
import { FormControl } from '@angular/forms';
import * as Highcharts from 'highcharts';
import { Options } from "highcharts";
import {ParameterGraphModel } from 'src/app/modules/feature/model/parameterGraphModel';
import {DashboardService } from 'src/app/modules/feature/services/dashboard.service';

@Component({
  selector: 'app-parameter-chart',
  templateUrl: './parameter-chart.component.html',
  styleUrls: ['./parameter-chart.component.scss']
})
export class ParameterChartComponent {

  variables = new FormControl();

  variableList = ['Yesterday Cycle Counter', 'Yesterday Cycle Run', 'Average Pump Fillage', 'Average SPM', 'Production Index', 'Load'];
  selectedVariables:any;


  toogle:boolean=false;
  
  public ChartOptions:any;
  Highcharts: typeof Highcharts = Highcharts;
  chartRef:any;

  legends:any[]=[];

  
  series :any[]=[];
  yaxisdataarray=[{ labels: {   style: { fontSize: 10 } },
  lineWidth: 0,
  title: { text: null } },
  { labels: { style: { fontSize: 10} },
  lineWidth: 0,
  opposite: true,  
  title: { text:  null }}];
  updateFromInput = false;

  cyclerCounterData:ParameterGraphModel[]=[];
  cyclerRunData:ParameterGraphModel[]=[];
  graphYAxisCycleCounter:any[] =[];
  graphYAxisCycleRun:any[] =[];
  graphXAxis:any[]=[];

  yesterday= [11,4,13,6,15,8,30];  
  run= [8,14,5,11,2,15,7];

  constructor(private _parameterGraphService: DashboardService)
  {

  } 

  chartCallback: Highcharts.ChartCallbackFunction = chart => {
    this.chartRef = chart;
  };
  
ngOnInit()
{
  this.GetCycleCounterDetails();
  this.GetCycleRunDetails();  
}

cleardata()
{
  this.cyclerCounterData=[];
  this.graphXAxis=[];
  this.graphYAxisCycleCounter=[];
}


GetCycleCounterDetails()
{  
  this.cyclerCounterData=[];  
  this.graphYAxisCycleCounter=[];

  this._parameterGraphService.GetCycleCounter().subscribe((response: any) => {
    this.cyclerCounterData=response;

    if(this.cyclerCounterData!=null)
    {
      for(let i=0;i<response.length;i++)
      {
       if(this.graphXAxis.length !=0)
       {
        if(!this.graphXAxis.some(x=> x.date == this.cyclerCounterData[i].date))
        {
          this.graphXAxis.push(this.cyclerCounterData[i].date);  
        }
       }
       else
       {
        this.graphXAxis.push(this.cyclerCounterData[i].date);  
       }
        
        this.graphYAxisCycleCounter.push([this.cyclerCounterData[i].date.toString(),this.cyclerCounterData[i].value]);        
      }

      this.series.push({id:1,name:"Yesterday Cycle Counter",well:"well 1",data:this.graphYAxisCycleCounter,color:'#4A2AA9',lineWidth:2,visible:true});
      this.series.push({id:2,linkedTo: 1,name:"Yesterday Cycle Counter",well:"well 2",data:this.yesterday,color:'#4A2AA9',lineWidth:2,showInLegend: false,visible:true});
     
      this.BindChart();
     // this.ChartOptions.yAxis=this.yaxisdataarray;
    }

  });
}


GetCycleRunDetails()
{

  this.cyclerRunData=[];
  this.graphYAxisCycleRun=[];

  this._parameterGraphService.GetCycleRun().subscribe((response: any) => {
    this.cyclerRunData=response;

    if(this.cyclerRunData!=null)
    {
      for(let i=0;i<response.length;i++)
      { 
        if(!this.graphXAxis.some(x=> x.date == this.cyclerRunData[i].date))
        {
          this.graphXAxis.push(this.cyclerRunData[i].date);  
        }
        this.graphYAxisCycleRun.push([this.cyclerRunData[i].date.toString(),this.cyclerRunData[i].value]);        
      }   
      
      this.series.push({id:3,name:"Yesterday Cycle Run",well:"Oil fields",data:this.graphYAxisCycleRun,color:'#ffe600',lineWidth:2,yAxis:1,visible:true});
      this.BindChart();
    }
  });
}

onChange($event:any) 
{  
  
  this.series=[];
  if(this.selectedVariables.includes('Yesterday Cycle Counter'))
  { 
    this.GetCycleCounterDetails();   
  }
  else
  { 
    this.series = this.series.filter(item => item.name='Yesterday Cycle Counter'); 
    this.BindChart();  
  }

  if(this.selectedVariables.includes('Yesterday Cycle Run'))
  {
    this.GetCycleRunDetails();  
  }
  else
  { 
    this.series = this.series.filter(item => item.name='Yesterday Cycle Run');  
    this.BindChart();   
  }
  
}

HideSeries(legendName:string)
{  
  this.series.forEach(element => {
    if(element.name == legendName)
    { 
      if(element.visible == undefined) 
      {
        element.visible=false;
      }
      else
      {
        element.visible= element.visible==true ? false : true;
      }    
      
    }    
  });  
  this.BindChart();
}

showTooltip(id:any)
{  
   var tooltip=   this.series.filter(a => a.id==id);
   if(tooltip.length>0)
   {
    return tooltip[0].well;
   } 
   else
   {
     return "";
   }  
   
}




BindChart()
{
  var that = this;
  this.ChartOptions = {      
    chart: {
        renderTo: 'container',
        type: 'line',
        margin: 80,      
        events: {
          load: function() {
            var chart : any = this;
              
            }
        }
  },            
  title: {
    text: '',
    marginTop:0
  },
  legend:{    
    layout: "horizontal",
      	align: "left",
      	useHTML: true,
      	maxHeight: 60,
        symbolHeight: 0,
        symbolWidth: 0,
        symbolRadius: 0,
      	labelFormatter: function () {
          var chart : any = this;
          return '<span><div style="height: 10px;width: 10px;background-color:'+chart.color+';display: inline-block; margin-right: 5px;"></div>'+chart.name+'</span>';
        }      	
    },
    tooltip: {   
      formatter(this: Highcharts.TooltipFormatterContextObject) {
        var wellname= that.showTooltip(this.series.options.id);
        return "X:"+this.x +"<br/>Y:"+this.y + "<br/>Name:" +this.series.name + "<br/>Well:" +wellname ;
      }
    },
    yAxis: this.yaxisdataarray,
    xAxis: {
      type: 'category',
      categories: this.graphXAxis,
      gridLineWidth: 1,
      labels: {   rotation: 0,style:{fontSize: 10}  }   
    },  
    plotOptions: {
      series: {
        marker: {  symbol: 'circle', radius:2   },
        states: { inactive: {  enabled:false  }   },
        events: {
            legendItemClick: function (e:Highcharts.SeriesLegendItemClickEventObject) {
              that.HideSeries(e.target.name) ;     
            },           
            mouseOver: function(e:any) {
              //that.HideSeries(e.target.name) ;
              //alert(e.target.name);
            },          
        }
      }    
    },
    series:this.series,   
    } as any;
}




}

