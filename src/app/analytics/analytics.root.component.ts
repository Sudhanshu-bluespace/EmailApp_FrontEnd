import { Component, OnInit, NgModule } from '@angular/core';
//import { LoginService } from "./login.service";
//import { User } from '../model/user';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GlobalService } from '../core/global.service';
import {BrowserModule} from '@angular/platform-browser';

import {Tabs} from './tabs.component';
import {Tab} from './tab.component';

@Component({
  selector: 'analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent {

	
  constructor() {
  }
  
  public columnChartOptions:any =  {
    chartType: 'ColumnChart',
    dataTable: [
      ['Country', 'Performance', 'Profits'],
      ['Germany', 700, 1200],
      ['USA', 300, 600],
      ['Brazil', 400, 500],
      ['Canada', 500, 1000],
      ['France', 600, 1100],
      ['RU', 800, 1000]
    ],
    options: {title: 'Countries',height:320}
  };
  
   public timelineChartOptions:any =  {
    chartType: 'Timeline',
    dataTable: [
      ['Name', 'From', 'To'],
      [ 'Washington', new Date(1789, 3, 30), new Date(1797, 2, 4) ],
      [ 'Adams',      new Date(1797, 2, 4),  new Date(1801, 2, 4) ],
      [ 'Jefferson',  new Date(1801, 2, 4),  new Date(1809, 2, 4) ]
		],
	options:
	{
		height:320
	}		
	};
	
	public barChartOptions:any = {
	
	dataTable: [
          ['Opening Move', 'Percentage'],
          ["King's pawn (e4)", 44],
          ["Queen's pawn (d4)", 31],
          ["Knight to King 3 (Nf3)", 12],
          ["Queen's bishop pawn (c4)", 10],
          ['Other', 3]
        ],
		
		options:	
		{
          title: 'Chess opening moves',
          width: 900,
		  height:300,
          legend: { position: 'none' },
          chart: { title: 'Chess opening moves',
                   subtitle: 'popularity by percentage' },
          bars: 'horizontal', // Required for Material Bar Charts.
          axes: {
            x: {
              0: { side: 'top', label: 'Percentage'} // Top x-axis.
            }
          },
          bar: { groupWidth: "90%" }
        }
	};
}