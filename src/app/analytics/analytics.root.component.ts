import { Component, OnInit, NgModule } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { AnalyticsService } from "../analytics/analytics.service";
import { CampaignWisePerformance } from '../analytics/model/CampaignWisePerformance';
import { GroupWiseUnsubscription } from '../analytics/model/GroupWiseUnsubscription';
import { GlobalService } from '../core/global.service';
import { Observable }     from 'rxjs/Observable';
import { ChartReadyEvent } from 'ng2-google-charts';
import { ViewChild, ElementRef } from '@angular/core';

import {Tabs} from './tabs.component';
import {Tab} from './tab.component';
<<<<<<< HEAD
import {CompanyWiseRegistrationDTO} from './model/CompanyWiseRegistrationDTO';
=======
>>>>>>> f4d4c06be256da45a6af7b6d90d2c94641306f05

@Component({
  selector: 'analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css'],
  providers: [AnalyticsService]
})
export class AnalyticsComponent {

	
  userName:string
  constructor(private AnalyticsService: AnalyticsService, private router: Router,private globalService: GlobalService) {
		  
		let user = this.globalService.loggedInUser.loggedInUserName;
		this.campaignWisePerformance(user);
		this.groupWiseSunsubscription(user);
<<<<<<< HEAD
		this.getCompanyWiseRegistrationStats();
=======
>>>>>>> f4d4c06be256da45a6af7b6d90d2c94641306f05

  }
  campaignWisePerformanceSummaryResponse:CampaignWisePerformance[]
  groupWiseUnsubscriptionResponse:GroupWiseUnsubscription[]
<<<<<<< HEAD
	companyWiseRegistrationSummary:CompanyWiseRegistrationDTO[]
=======
>>>>>>> f4d4c06be256da45a6af7b6d90d2c94641306f05
  
    campaignWisePerformance(username: string){
	    
    this.AnalyticsService.campaignWisePerformanceSummary(username)
            .subscribe((data) => {
                 this.campaignWisePerformanceSummaryResponse=data;
			for (let entry of this.campaignWisePerformanceSummaryResponse) 
			{
				console.log(entry.campaignName+" | "+entry.totalReach); // 1, "string", false
			} 
			//console.log("response : "+this.summary.unsubscribes+" | "+this.summary.reach+" | "+this.summary.clicks);
			this.myClickCampaignWisePerformance();
			//this.loadData("Sent on "+this.summary.sentOn,this.summary.subject,this.summary.clickPercentage,this.summary.unsubscribePercentage);
            },
            error => {
            });		
  };
<<<<<<< HEAD

	getCompanyWiseRegistrationStats(){
	    
    this.AnalyticsService.companyWiseRegistrationStats()
            .subscribe((data) => {
                 this.companyWiseRegistrationSummary=data;
			for (let entry of this.companyWiseRegistrationSummary) 
			{
				console.log(entry.companyName+" | "+entry.approvedCount+" | "+entry.pendingCount); // 1, "string", false
			} 
			//console.log("response : "+this.summary.unsubscribes+" | "+this.summary.reach+" | "+this.summary.clicks);
			this.myClickCompanyWiseRegistration();
			//this.loadData("Sent on "+this.summary.sentOn,this.summary.subject,this.summary.clickPercentage,this.summary.unsubscribePercentage);
            },
            error => {
            });		
  };
=======
>>>>>>> f4d4c06be256da45a6af7b6d90d2c94641306f05
  
  groupWiseSunsubscription(username: string){
	  this.AnalyticsService.groupWiseUnsubscription(username)
            .subscribe((data) => {
                 this.groupWiseUnsubscriptionResponse=data;
			for (let entry of this.groupWiseUnsubscriptionResponse) 
			{
				console.log(entry.groupName+" | "+entry.unsubscribed); // 1, "string", false
			}
			//console.log("response : "+this.summary.unsubscribes+" | "+this.summary.reach+" | "+this.summary.clicks);
			this.myClickGroupWiseUnsubscribes();
			//this.loadData("Sent on "+this.summary.sentOn,this.summary.subject,this.summary.clickPercentage,this.summary.unsubscribePercentage);
            },
            error => {
            });		
	  
	  
  }
  
   public myClickGroupWiseUnsubscribes():void {
    // forces a reference update (otherwise angular doesn't detect the change)
    this.barChartOptions = Object.create(this.barChartOptions);
	for(let entry of this.groupWiseUnsubscriptionResponse)
	{
	  console.log("Setting values for : "+entry.groupName+" | "+entry.unsubscribed);	
	  this.barChartOptions.dataTable.push([entry.groupName,entry.unsubscribed]);
	}
  }
<<<<<<< HEAD

	 public myClickCompanyWiseRegistration():void {
    // forces a reference update (otherwise angular doesn't detect the change)
    this.regColumnChartOptions = Object.create(this.regColumnChartOptions);
	for(let entry of this.companyWiseRegistrationSummary)
	{
	  console.log("Setting values for : "+entry.companyName);	
	  this.regColumnChartOptions.dataTable.push([entry.companyName,entry.approvedCount,entry.pendingCount]);
	}
  }
  
  public myClickCampaignWisePerformance():void 
	{
    // forces a reference update (otherwise angular doesn't detect the change)
		console.log("Combo chart values : "+this.columnChartOptions.dataTable[0][0]+" | "+this.columnChartOptions.dataTable[0][1]);
    this.columnChartOptions = Object.create(this.columnChartOptions);

		for(let entry of this.campaignWisePerformanceSummaryResponse)
		{
	  	console.log("Setting values for : "+entry.subject+" | "+entry.totalReach+" | "+entry.clicks+" | "+entry.unsubscribes);	
	  	this.columnChartOptions.dataTable.push([entry.subject,entry.totalReach,entry.clicks,entry.unsubscribes]);
		}
=======
  
  public myClickCampaignWisePerformance():void {
    // forces a reference update (otherwise angular doesn't detect the change)
	console.log("Combo chart values : "+this.columnChartOptions.dataTable[0][0]+" | "+this.columnChartOptions.dataTable[0][1]);
    this.columnChartOptions = Object.create(this.columnChartOptions);

	for(let entry of this.campaignWisePerformanceSummaryResponse)
	{
	  console.log("Setting values for : "+entry.subject+" | "+entry.totalReach+" | "+entry.clicks+" | "+entry.unsubscribes);	
	  this.columnChartOptions.dataTable.push([entry.subject,entry.totalReach,entry.clicks,entry.unsubscribes]);
	}
>>>>>>> f4d4c06be256da45a6af7b6d90d2c94641306f05
  }
	
	public lineChartOptions:any =  {
		chartType: 'LineChart',
		dataTable: [
<<<<<<< HEAD
		  [{label:'Company Name',type:'string'},{ label:'Nmber of Approved Registrations',type:'number'},{label:'Number of Pending Registrations',type:'number'}]
		],
		options: {
			title: 'Company Wise Registrations',
			animation:
			{
				duration: 1000,
				easing: 'out',
				startup:true
			},
			vAxis: 
			{
				title: 'Count'
			},
			hAxis: 
			{
				title: 'Company Name'
			},
			width:'95%',
			height:'350'
		}
	  };

		public regColumnChartOptions:any =  {
		chartType: 'ColumnChart',
		dataTable: [
		  [{label:'Company Name',type:'string'},{ label:'Nmber of Approved Registrations',type:'number'},{label:'Number of Pending Registrations',type:'number'}]
		],
		options: {
			title: 'Company Wise Registrations',
=======
		  ['Group Name', 'Number of unsubscribes']
		],
		options: {
			title: 'Group Wise Unsubscriptions',
>>>>>>> f4d4c06be256da45a6af7b6d90d2c94641306f05
			animation:
			{
				duration: 1000,
				easing: 'out',
				startup:true
<<<<<<< HEAD
			},
			bar: 
			{ 
				groupWidth: '40' 
			},
			vAxis: 
			{
				title: 'Count'
			},
			hAxis: 
			{
				title: 'Company Name'
			},
			seriesType: 'bars',
			isStacked:true,
			width:'95%',
			height:'350'
		}
=======
			}
		},
		width:'95%',
		height:'350'
>>>>>>> f4d4c06be256da45a6af7b6d90d2c94641306f05
	  };
	  
	public columnChartOptions:any =  {
    chartType: 'ColumnChart',
    dataTable: [
<<<<<<< HEAD
      [{label:'Campaign Name',type:'string'}, {label:'Total Reach',type:'number'}, {label:'Total Clicks',type:'number'}, {label:'Unsubscribes',type:'number'}]
=======
      ['Campaign Name', 'Total Reach', 'Total Clicks', 'Unsubscribes']
>>>>>>> f4d4c06be256da45a6af7b6d90d2c94641306f05
    ],
    options: 
	{
		title: 'Campaign Wise Performance Summary',
		height:'350',
<<<<<<< HEAD
		bar: 
			{ 
				groupWidth: '40' 
			},
=======
>>>>>>> f4d4c06be256da45a6af7b6d90d2c94641306f05
		vAxis: 
		{
			title: 'Count'
		},
		hAxis: 
		{
			title: 'Campaign Name'
		},
		seriesType: 'bars',
		isStacked:true,
		animation:
		{
				duration: 1000,
				easing: 'out',
				startup:true
		},
		width:'95%'
	}
  };
  
	  
	public comboChartOptions:any =  {
    chartType: 'ComboChart',
    dataTable: [
      ['Campaign Name', 'Total Reach', 'Total Clicks', 'Unsubscribes']
    ],
    options: {
      title : 'Campaign Wise Performance Summary',
	  height:'350',
      vAxis: {title: 'Count'},
      hAxis: {title: 'Campaign Name'},
      seriesType: 'bars',
      series: {5: {type: 'line'}},
		animation:
		{
				duration: 1000,
				easing: 'out',
				startup:true
		},
	  width:'95%',
	  chartArea: { width: '65%',right:'15%',top:'1%',height:'85%' },
    }
  };

  public pieChartOptions:any =  {
    chartType: 'PieChart',
    dataTable: [
      ['Metrics', 'Percentage'],
      ['Sent',     11],
      ['Reach',      2],
      ['Clicks',  2],
      ['Failure', 2],
      ['Bounce',    7]
    ],
    options: {
		title: 'Tasks',
			animation:
			{
				duration: 1000,
				easing: 'out',
				startup:true
			},
		is3D:true,
		width:'95%',
		height:'350'
	}
  };
  
  	public barChartOptions:any = {
		  
		chartType: 'BarChart',  
		dataTable: [
<<<<<<< HEAD
			[{label:'Group Name',type:'string'}, {label:'Count',type:'number'}]
=======
			['Group Name', 'Count']
>>>>>>> f4d4c06be256da45a6af7b6d90d2c94641306f05
		],

		options:
		{
			width:'95%',
			height:'350',
			chartArea: { width: '65%',right:'15%',top:'1%' },
			bar: 
			{ 
<<<<<<< HEAD
				groupWidth: '40' 
=======
				groupWidth: '50%' 
>>>>>>> f4d4c06be256da45a6af7b6d90d2c94641306f05
			},
			animation:
			{
				duration: 1000,
				easing: 'out',
				startup:true
			},
			hAxis: {
				title: 'Count',
				minValue: 0,
				textStyle: {
					bold: true,
					fontSize: 11,
					color: '#4d4d4d'
				},
				titleTextStyle: {
					bold: true,
					fontSize: 12,
					color: '#4d4d4d'
				}
			},
			vAxis: {
				title: 'Group Names',
				textStyle: {
					fontSize: 11,
					bold: true,
				},
				titleTextStyle: {
					fontSize: 14,
					bold: true,
					color: '#848484'
				}
			}
		}  
	  };	

}