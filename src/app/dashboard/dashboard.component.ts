import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from "../analytics/analytics.service";
import { RecentChartSummary } from '../analytics/model/RecentChartSummary';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GlobalService } from '../core/global.service';
import { Observable }     from 'rxjs/Observable';
import { ChartReadyEvent } from 'ng2-google-charts';
import { ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [AnalyticsService]
})
export class DashboardComponent implements OnInit {

  userName:string
  constructor(private AnalyticsService: AnalyticsService, private router: Router,private globalService: GlobalService) {
		  
		let user = this.globalService.loggedInUser.loggedInUserName;
		this.recentChartSummary(user);

  }
  summary:RecentChartSummary
  dataSet:any[]
  

  ngOnInit() {

  }
  
  	@ViewChild('sentOnDate') sentOnDate: ElementRef;
	@ViewChild('emailSubject') emailSubject: ElementRef;
	@ViewChild('clickPercentage') clickPercentage: ElementRef;
	@ViewChild('unsubscribePercentage') unsubscribePercentage: ElementRef;

    loadData(sentOn,subject,clickPercentage,unsubscribePercentage) {
        this.sentOnDate.nativeElement.innerHTML = sentOn;
		this.emailSubject.nativeElement.innerHTML = subject;
		this.clickPercentage.nativeElement.innerHTML = clickPercentage+'%';
		this.unsubscribePercentage.nativeElement.innerHTML = unsubscribePercentage+'%';		
    }
  
  recentChartSummary(username: string){
	    
    this.AnalyticsService.recentChartSummary(username)
            .subscribe((data) => {
                 this.summary = data;
			console.log("data: ",data);	 
			console.log("response : "+this.summary.unsubscribes+" | "+this.summary.reach+" | "+this.summary.clicks);
			this.myClick();
			this.loadData("Sent on "+this.summary.sentOn,this.summary.subject,this.summary.clickPercentage,this.summary.unsubscribePercentage);
            },
            error => {
            });		
  };
  
  public ready(event: ChartReadyEvent) {
    console.log("Chart Ready",event.message);
  }
  
  public myClick():void {
    // forces a reference update (otherwise angular doesn't detect the change)
    this.barChartOptions = Object.create(this.barChartOptions);
      this.barChartOptions.dataTable[1][1] = this.summary.reach;
      this.barChartOptions.dataTable[2][1] = this.summary.clicks;
	  this.barChartOptions.dataTable[3][1] = this.summary.unsubscribes;
  }
	
	  public barChartOptions:any = {
		  
		chartType: 'BarChart',  
		dataTable: [
			['Metrics Type', 'Count'],
			['Total Reach', 0],
			['Total Clicks',0],
			['Unsubscribed',0]
		
		],

		options:
		{
			width:'95%',
			chartArea: { width: '65%',right:'15%',top:'1%' },
			bar: 
			{ 
				groupWidth: '50%' 
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
				title: 'Categories',
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
