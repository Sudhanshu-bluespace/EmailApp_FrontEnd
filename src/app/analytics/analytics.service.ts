import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { RecentChartSummary } from './model/RecentChartSummary';
import { RecentUnsubscribes } from '../analytics/model/RecentUnsubscribes';
import { RecentUnsubscribedCount } from '../analytics/model/RecentUnsubscribedCount';
import { CampaignWisePerformance } from './model/CampaignWisePerformance';
import { JobStatusData } from '../analytics/model/JobStatusData';
import { GroupWiseUnsubscription } from './model/GroupWiseUnsubscription';
import { PageLink } from '../security/model/pagelink';
import { CompanyWiseRegistrationDTO } from './model/CompanyWiseRegistrationDTO';

@Injectable()
export class AnalyticsService {
    
  constructor (private http: Http) {    
  }

  getJobStatusData(userName:string): Observable<JobStatusData[]>
  {
       let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let options = new RequestOptions({ headers: headers });
		let urlSearchParams = new URLSearchParams();
        urlSearchParams.append('userName', userName);
		let body = urlSearchParams.toString();
          return this.http.post('analytics/getJobStatusData',body,options)
		 .map(res => res.json())
		 .catch(this.handleError); 
  }

  getBlockedContacts()
  {
         let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let options = new RequestOptions({ headers: headers });
		//let urlSearchParams = new URLSearchParams();
        //urlSearchParams.append('userName', userName);
		//let body = urlSearchParams.toString();
          return this.http.post('analytics/getBlockedContacts',options)
		 .map(res => res.json())
		 .catch(this.handleError); 
  }

  cancelJob(batchId:number,requestId:string){

      let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let options = new RequestOptions({ headers: headers });
		let urlSearchParams = new URLSearchParams();
        urlSearchParams.append('batchId', batchId.toString());
        urlSearchParams.append('requestId', requestId);
		let body = urlSearchParams.toString();
          return this.http.post('analytics/cancelJob',body,options)
		 .map(res => res.json())
		 .catch(this.handleError);  
  }

  recentChartSummary (userName: string):  Observable<RecentChartSummary>  {
        let headers = new Headers();
		//console.log("dashboard for "+userName);
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let options = new RequestOptions({ headers: headers });
		let urlSearchParams = new URLSearchParams();
        urlSearchParams.append('userName', userName);
		let body = urlSearchParams.toString();
          return this.http.post('analytics/recentSummary',body,options)
		 .map(res => res.json())
		 .catch(this.handleError);   
  }

  recentUnsubscribes (age: number,isAdmin:string):  Observable<RecentUnsubscribes[]>  {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let options = new RequestOptions({ headers: headers });
		let urlSearchParams = new URLSearchParams();
        urlSearchParams.append('age', age.toString());
        urlSearchParams.append('isAdmin', isAdmin);
		let body = urlSearchParams.toString();
          return this.http.post('analytics/getRecentUnsubscribes',body,options)
		 .map(res => res.json())
		 .catch(this.handleError);    
  }

   recentUnsubscribedCount (age: number,isAdmin:string):  Observable<RecentUnsubscribedCount[]>  {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let options = new RequestOptions({ headers: headers });
		let urlSearchParams = new URLSearchParams();
        urlSearchParams.append('age', age.toString());
        urlSearchParams.append('isAdmin', isAdmin);
		let body = urlSearchParams.toString();
          return this.http.post('analytics/getRecentUnsubscribedCount',body,options)
		 .map(res => res.json())
		 .catch(this.handleError);    
  }

  companyWiseRegistrationStats(): Observable<CompanyWiseRegistrationDTO[]> {

        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let options = new RequestOptions({ headers: headers });
        return this.http.get('analytics/getCompanyWiseRegistrationStats',options)
		.map(res => res.json())
		.catch(this.handleError);  

  }
  
  campaignWisePerformanceSummary (userName: string):  Observable<CampaignWisePerformance[]>  {
        let headers = new Headers();
		//console.log("campaign wise summary for "+userName);
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let options = new RequestOptions({ headers: headers });
		let urlSearchParams = new URLSearchParams();
        urlSearchParams.append('userName', userName);
		let body = urlSearchParams.toString();
          return this.http.post('analytics/campaignWisePerformance',body,options)
		 .map(res => res.json())
		 .catch(this.handleError);   
  }
  
  groupWiseUnsubscription (userName: string):  Observable<GroupWiseUnsubscription[]>  {
        let headers = new Headers();
		//console.log("groupwise unsubscription for "+userName);
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let options = new RequestOptions({ headers: headers });
		let urlSearchParams = new URLSearchParams();
        urlSearchParams.append('userName', userName);
		let body = urlSearchParams.toString();
          return this.http.post('analytics/groupWiseUnsubscription',body,options)
		 .map(res => res.json())
		 .catch(this.handleError);;     
  }

  private extractData(res: Response) {     
    let body = res.json();
    return body.data || { };
  }
  

  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    //console.log(error);
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    //console.error(errMsg);
    return Observable.throw(errMsg);
  }
}