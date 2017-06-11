import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod, URLSearchParams } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { PendingAccountApprovals } from '../model/pendingaccountapprovals';
import { AccountApproval } from '../model/AccountApproval';

@Injectable()
export class AccountApprovalService{

     constructor(private http: Http){}

    getPendingApprovals (userName: string):  Observable<PendingAccountApprovals[]>  {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let options = new RequestOptions({ headers: headers });
        let urlSearchParams = new URLSearchParams();
        urlSearchParams.append('userName', userName);
        let body = urlSearchParams.toString();
        return this.http.post('accounts/getPendingApprovals', body, options )
         .map(res => res.json())
		 .catch(this.handleError);;  
  }

  approveRequest(idToApprove:string): Observable<AccountApproval>
  {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let options = new RequestOptions({ headers: headers });
        let urlSearchParams = new URLSearchParams();
        urlSearchParams.append('id', idToApprove);
        let body = urlSearchParams.toString();
        return this.http.post('accounts/approveRequest', body, options )
         .map((res: Response)  => { return; })
		 .catch(this.handleError);;  

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