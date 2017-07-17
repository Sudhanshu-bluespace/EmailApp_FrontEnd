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
import { AuthorizationService } from '../core/authorization.service';

import {Tabs} from './tabs.component';
import {Tab} from './tab.component';
import {CompanyWiseRegistrationDTO} from './model/CompanyWiseRegistrationDTO';

@Component({
  selector: 'analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css'],
  providers: [AnalyticsService]
})
export class AnalyticsComponent {

	
  userName:string
  constructor(private AnalyticsService: AnalyticsService, private router: Router,private globalService: GlobalService,private authorizationService:AuthorizationService) {
		  
		let user = this.globalService.loggedInUser.loggedInUserName;
		this.campaignWisePerformance(user);
		this.groupWiseSunsubscription(user);
		this.getCompanyWiseRegistrationStats();

  }
  campaignWisePerformanceSummaryResponse:CampaignWisePerformance[]
  groupWiseUnsubscriptionResponse:GroupWiseUnsubscription[]
	companyWiseRegistrationSummary:CompanyWiseRegistrationDTO[]
  
    campaignWisePerformance(username: string){
	    
    this.AnalyticsService.campaignWisePerformanceSummary(username)
            .subscribe((data) => {
                 this.campaignWisePerformanceSummaryResponse=data;
		/*	for (let entry of this.campaignWisePerformanceSummaryResponse) 
			{
				console.log(entry.campaignName+" | "+entry.totalReach); // 1, "string", false
			}*/ 
			//console.log("response : "+this.summary.unsubscribes+" | "+this.summary.reach+" | "+this.summary.clicks);
			this.myClickCampaignWisePerformance();
			//this.loadData("Sent on "+this.summary.sentOn,this.summary.subject,this.summary.clickPercentage,this.summary.unsubscribePercentage);
            },
            error => {
            });		
  };

	getCompanyWiseRegistrationStats(){
	    
    this.AnalyticsService.companyWiseRegistrationStats()
            .subscribe((data) => {
                 this.companyWiseRegistrationSummary=data;
			/*for (let entry of this.companyWiseRegistrationSummary) 
			{
				console.log(entry.companyName+" | "+entry.approvedCount+" | "+entry.pendingCount); // 1, "string", false
			}*/ 
			//console.log("response : "+this.summary.unsubscribes+" | "+this.summary.reach+" | "+this.summary.clicks);
			this.myClickCompanyWiseRegistration();
			//this.loadData("Sent on "+this.summary.sentOn,this.summary.subject,this.summary.clickPercentage,this.summary.unsubscribePercentage);
            },
            error => {
            });		
  };
  
  groupWiseSunsubscription(username: string){
	  this.AnalyticsService.groupWiseUnsubscription(username)
            .subscribe((data) => {
                 this.groupWiseUnsubscriptionResponse=data;
		/*	for (let entry of this.groupWiseUnsubscriptionResponse) 
			{
				console.log(entry.groupName+" | "+entry.unsubscribed); // 1, "string", false
			}*/
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
	  //console.log("Setting values for : "+entry.groupName+" | "+entry.unsubscribed);	
	  this.barChartOptions.dataTable.push([entry.groupName,entry.unsubscribed]);
	}
  }

	 public myClickCompanyWiseRegistration():void {
    // forces a reference update (otherwise angular doesn't detect the change)
    this.regColumnChartOptions = Object.create(this.regColumnChartOptions);
	for(let entry of this.companyWiseRegistrationSummary)
	{
	  //console.log("Setting values for : "+entry.companyName);	
	  this.regColumnChartOptions.dataTable.push([entry.companyName,entry.approvedCount,entry.pendingCount]);
	}
  }
  
  public myClickCampaignWisePerformance():void 
	{
    // forces a reference update (otherwise angular doesn't detect the change)
		//console.log("Combo chart values : "+this.columnChartOptions.dataTable[0][0]+" | "+this.columnChartOptions.dataTable[0][1]);
    this.columnChartOptions = Object.create(this.columnChartOptions);

		for(let entry of this.campaignWisePerformanceSummaryResponse)
		{
	  	//console.log("Setting values for : "+entry.subject+" | "+entry.totalReach+" | "+entry.clicks+" | "+entry.unsubscribes);	
	  	this.columnChartOptions.dataTable.push([entry.subject,entry.totalReach,entry.clicks,entry.unsubscribes]);
		}
  }

		public regColumnChartOptions:any =  {
		chartType: 'ColumnChart',
		dataTable: [
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
	  };
	  
	public columnChartOptions:any =  {
    chartType: 'ColumnChart',
    dataTable: [
      [{label:'Campaign Name',type:'string'}, {label:'Total Reach',type:'number'}, {label:'Total Clicks',type:'number'}, {label:'Unsubscribes',type:'number'}]
    ],
    options: 
	{
		title: 'Campaign Wise Performance Summary',
		height:'350',
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
			[{label:'Group Name',type:'string'}, {label:'Count',type:'number'}]
		],

		options:
		{
			width:'95%',
			height:'350',
			chartArea: { width: '65%',right:'15%',top:'1%' },
			bar: 
			{ 
				groupWidth: '40' 
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