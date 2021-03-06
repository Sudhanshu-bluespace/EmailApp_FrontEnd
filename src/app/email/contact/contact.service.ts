import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions, URLSearchParams } from "@angular/http";
import { Observable }     from "rxjs/Observable";
import { Contact } from "./contact";
import { ContactSearchCriteria } from "./contact_search_criteria";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class ContactService {

    private contactUrl = "contacts";

    constructor(private http: Http) { }

    createContact(contact: Contact): Observable<Contact> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(this.contactUrl, JSON.stringify(contact), { headers: headers })
            .map((res: Response) => { return; })
            .catch(this.handleError);
    }

    getContactById(id: number): Observable<Contact> {
        return this.http.get(this.contactUrl + "/" + id)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    getAllContactsByCriteria(contactSearchCriteria: ContactSearchCriteria,username:string): Observable<Contact[]> {
        let headers = new Headers();  
        headers.append('Content-Type', 'application/json');
        contactSearchCriteria.username = username;
        return this.http.post(this.contactUrl + "/searchCriteria", JSON.stringify(contactSearchCriteria), { headers: headers })
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    getAllContacts(username:string): Observable<Contact[]> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let options = new RequestOptions({ headers: headers });
        let urlSearchParams = new URLSearchParams();
        urlSearchParams.append('username', username);
        let body = urlSearchParams.toString(); 
        return this.http.post(this.contactUrl+'/getAllByCreatedUser', body, options )
            .map(res => res.json())
            .catch(this.handleError);
    }

    updateContact(contact: Contact) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put(this.contactUrl + "/" + contact.id, JSON.stringify(contact), { headers: headers })
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    deleteContact(objectId: number): Observable<void> {
        return this.http.delete(this.contactUrl + "/" + objectId)
            .map((res: Response) => { return; })
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }

    /*private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }*/

    private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    //console.log(error);
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      console.log("Raw error : "+error.toString);
      console.log("Body : "+body);
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
      console.log("Error not a response : "+errMsg);
    }
    //console.error(errMsg);
    return Observable.throw(errMsg);
  }

}