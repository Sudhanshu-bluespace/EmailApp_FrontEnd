import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from "../analytics/analytics.service";
import { RecentChartSummary } from '../analytics/model/RecentChartSummary';
import { RecentUnsubscribes } from '../analytics/model/RecentUnsubscribes';
import { RecentUnsubscribedCount } from '../analytics/model/RecentUnsubscribedCount';
import { JobStatusData } from '../analytics/model/JobStatusData';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GlobalService } from '../core/global.service';
import { AuthorizationService } from '../core/authorization.service';
import { Observable }     from 'rxjs/Observable';
import { ChartReadyEvent } from 'ng2-google-charts';
import { ViewChild, ElementRef } from '@angular/core';
import { Message } from "../message";
import { BlockedContacts } from '../analytics/model/BlockedContacts';
import { MenuItem } from "primeng/primeng";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css','../email/contact/fileupload.component.css'],
  providers: [AnalyticsService]
})
export class DashboardComponent implements OnInit {

  userName:string
  admin:boolean=false;
  isAdmin:string;
  constructor(private AnalyticsService: AnalyticsService, private router: Router,private globalService: GlobalService,private authService:AuthorizationService) {
		  
		let user = this.globalService.loggedInUser.loggedInUserName;
		if (this.globalService.loggedInUser.userType === 'ACC_TYPE_SUPER_ADMIN' || this.globalService.loggedInUser.userType === 'ACC_TYPE_ADMIN') 
		{
			this.admin = true;
			this.isAdmin = "true";
			this.getBlockedContacts();
		}
		else
		{
			this.isAdmin = "false";
		}

		this.recentChartSummary(user);
		this.recentUnsubscribedCount(60);
		this.recentUnsubscribes(60);
		this.getJobStatusDump(user);

		//console.log("User Type : "+this.globalService.loggedInUser.userType);


  }
  summary:RecentChartSummary
  unsubscribes:RecentUnsubscribes[]
  unsubscribedCount:RecentUnsubscribedCount[]
  dataSet:any[]
  msgs: Message[] = [];
  noDataFound:boolean = false
  //jobstatusdata:JobStatusData[]
  blockedContacts:BlockedContacts[]
  jobstatusdataQueued:JobStatusData[]=[];
  jobstatusdataCompleted:JobStatusData[]=[];
  jobstatusdataFailed:JobStatusData[]=[];
  datatable_menu_items: MenuItem[];
  selectedJob:JobStatusData

  getBlockedContacts()
  {
	 this.AnalyticsService.getBlockedContacts()
 			.subscribe((data) => {
                 this.blockedContacts = data;
					},
					error => {
					});	
  }

  getJobStatusDump(userName:string)
  {
	   this.AnalyticsService.getJobStatusData(userName)
 			.subscribe((data) => {
                 //this.jobstatusdata = data;
						for(let entry of data)
						{
							if(entry.status==='COMPLETED')
							{
								this.jobstatusdataCompleted.push(entry);
							}
							else if(entry.status==='QUEUED')
							{
								this.jobstatusdataQueued.push(entry);
							}
							else if(entry.status==='FAILED')
							{
								this.jobstatusdataFailed.push(entry);
							}
						}
					},
					error => {
					});	
  }

  cancelJob(data:JobStatusData)
  {
	  this.AnalyticsService.cancelJob(data.batchId,data.requestId)
	  .subscribe((data)=>{
			 this.msgs.push({ severity: "info", summary: "Job Cancelled", detail: "The cancellation request was procesed successfully" });
	  },
	  error => {
			 this.msgs.push({ severity: "error", summary: "Failed to process cancellation request", detail: error });
	  });
  }

  refreshStats()
  {
	    this.clear();
	  	let user = this.globalService.loggedInUser.loggedInUserName;
		this.getJobStatusDump(user);
  }

  clear()
  {
	  this.jobstatusdataQueued.splice(0);
	  this.jobstatusdataCompleted.splice(0);
	  this.jobstatusdataFailed.splice(0);
  }
  
  getClass(id:number)
  {
	  if(id%2===0)
	  {
		 // console.log("id "+id+" Return class as even");
		  return "even";
	  }
	  else
	  {
		 // console.log("id "+id+"Return class as odd");
			return "odd";
	  }
  }

  ngOnInit() {
	   this.datatable_menu_items = [
            {label: 'Cancel', icon: 'fa-close', command: (event) => this.cancelJob(this.selectedJob)}
        ];
  }
  
  	@ViewChild('sentOnDate') sentOnDate: ElementRef;
	@ViewChild('emailSubject') emailSubject: ElementRef;
	@ViewChild('clickPercentage') clickPercentage: ElementRef;
	@ViewChild('unsubscribePercentage') unsubscribePercentage: ElementRef;
	@ViewChild('reachPercentage') reachPercentage: ElementRef;

    loadData(sentOn,subject,clickPercentage,unsubscribePercentage) {
        this.sentOnDate.nativeElement.innerHTML = sentOn;
		this.emailSubject.nativeElement.innerHTML = subject;
		this.clickPercentage.nativeElement.innerHTML = clickPercentage+'%';
		this.unsubscribePercentage.nativeElement.innerHTML = unsubscribePercentage+'%';
		if(this.summary.reach === 0)
		{
			this.reachPercentage.nativeElement.innerHTML = '0%';	
		}		
		else
		{
			this.reachPercentage.nativeElement.innerHTML = '100%';
		}
			
    }
  
  recentChartSummary(username: string){
	    
    this.AnalyticsService.recentChartSummary(username)
            .subscribe((data) => {
                 this.summary = data;
			console.log("data: ",data);	 
			console.log("response : "+this.summary.unsubscribes+" | "+this.summary.reach+" | "+this.summary.clicks);
			if(this.summary.unsubscribes === 0)
			{
				this.summary.unsubscribePercentage = 0;
			}
			else
			{
				this.summary.unsubscribePercentage = (this.summary.unsubscribes/this.summary.reach)*100;
			}

			if(this.summary.clicks === 0)
			{
				this.summary.clickPercentage = 0;
			}
			else
			{
				this.summary.clickPercentage = (this.summary.clicks/this.summary.reach)*100;
			}		
			
			this.myClick();
			this.loadData("Sent on "+this.summary.sentOn,this.summary.subject,this.summary.clickPercentage,this.summary.unsubscribePercentage);
            },
            error => {
            });		
  };

  recentUnsubscribes(age: number){
	    
    this.AnalyticsService.recentUnsubscribes(age,this.isAdmin)
            .subscribe((data) => {
                 this.unsubscribes = data;
				 if(this.unsubscribes.length===0)
				 {
					 this.noDataFound = true;
				 }
			console.log("unsubscribes: ",data);
            },
            error => {
				this.noDataFound = true;
            });		
  };

  recentUnsubscribedCount(age: number){
	    
    this.AnalyticsService.recentUnsubscribedCount(age,this.isAdmin)
            .subscribe((data) => {
                 this.unsubscribedCount = data;
			console.log("unsubscribedCount: ",data);
			this.myRecentUnsubscribedCountClick();
            },
            error => {
            });		
  };
  
  public ready(event: ChartReadyEvent) {
    console.log("Chart Ready",event.message);
  }

  public myRecentUnsubscribedCountClick():void {

	  this.unsubscribeLineChartOptions = Object.create(this.unsubscribeLineChartOptions);
	  let i=0;
	  for(let entry of this.unsubscribedCount)
	  {
			this.unsubscribeLineChartOptions.dataTable.push([entry.unsubscribedOn,entry.count]);
	  }

  }
  
  public myClick():void {
    // forces a reference update (otherwise angular doesn't detect the change)
    this.barChartOptions = Object.create(this.barChartOptions);
      this.barChartOptions.dataTable[1][1] = this.summary.reach;
      this.barChartOptions.dataTable[2][1] = this.summary.clicks;
	  this.barChartOptions.dataTable[3][1] = this.summary.unsubscribes;
  }

  	public unsubscribeLineChartOptions:any =  {
		chartType: 'LineChart',
		dataTable: [
		  [{label:'Date',type:'string'},{ label:'Nmber of Unsubscriptions',type:'number'}]
		],
		options: {
			title: 'Recent Unsubscribes',
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
				title: 'Date'
			},
			width:'95%',
			height:'350'
		}
	  };
	
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
