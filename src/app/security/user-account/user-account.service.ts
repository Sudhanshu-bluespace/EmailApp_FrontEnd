import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import {UserAccountTypeConstant} from '../model/UserAccountTypeConstant';
import {UserAccountSearchCriteria} from '../model/UserAccountSearchCriteria';
import {UserAccount} from '../model/user_account';
import { UserAccountChangePasswordResource } from '../model/user_account_change_password_resource';
<<<<<<< HEAD
import {Company} from '../model/Company';
=======
>>>>>>> f4d4c06be256da45a6af7b6d90d2c94641306f05

@Injectable()
export class UserAccountService {

  constructor(private http: Http) { }

 
getUserAccounts (userAccountSearchCriteria: UserAccountSearchCriteria):  Observable<UserAccount[]>  {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('userAccounts/search', JSON.stringify(userAccountSearchCriteria), { headers: headers })
            .map(res => res.json())
            .catch(this.handleError);   
  }

<<<<<<< HEAD
getCompanyList() :Observable<Company[]> {
          let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.get('userAccounts/getCompanyList', { headers: headers })
            .map(res => res.json())
            .catch(this.handleError);
}	

=======
>>>>>>> f4d4c06be256da45a6af7b6d90d2c94641306f05
getUserAccountById(id: number): Observable<UserAccount> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.get('userAccounts/' + id)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    } 

createUserAccount (userAccount: UserAccount):  Observable<UserAccount>  {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('userAccounts', JSON.stringify(userAccount), { headers: headers })
            .map((res: Response)  => { return; })
            .catch(this.handleError);   
  }

deleteUserAccountById(id: number): Observable<UserAccount> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.delete('userAccounts/' + id)
            .map((res: Response)  => { return; })
            .catch(this.handleError);
} 

updateUserAccount (userAccount: UserAccount):  Observable<UserAccount>  {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put('userAccounts' + "/" + userAccount.objectId, JSON.stringify(userAccount), { headers: headers })
            .map((res: Response)  => { return; })
            .catch(this.handleError);  
  }

changeUserPassword (userAccountChangePasswordResource: UserAccountChangePasswordResource):  Observable<UserAccount>  {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('userAccounts/changepassword' , JSON.stringify(userAccountChangePasswordResource), { headers: headers })
            .map((res: Response)  => { return; })
            .catch(this.handleError);  
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
