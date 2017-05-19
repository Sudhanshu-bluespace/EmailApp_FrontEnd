import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { RecentChartSummary } from './model/RecentChartSummary';
import { PageLink } from '../security/model/pagelink';

@Injectable()
export class AnalyticsService {
    
  constructor (private http: Http) {    
  }

  recentChartSummary (userName: string):  Observable<RecentChartSummary>  {
        let headers = new Headers();
		console.log("dashboard for "+userName);
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let options = new RequestOptions({ headers: headers });
		let urlSearchParams = new URLSearchParams();
        urlSearchParams.append('userName', userName);
		let body = urlSearchParams.toString();
          return this.http.post('analytics/recentSummary',body,options)
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
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    //console.error(errMsg);
    return Observable.throw(errMsg);
  }
}