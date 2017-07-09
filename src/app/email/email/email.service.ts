import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Email } from "./email";
import { Observable } from "rxjs/Observable";

@Injectable()
export class EmailService {

    private emailUrl = "emails";

    constructor(private http: Http) { }

    sendEmail(emailVo: Email) {       
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(this.emailUrl, JSON.stringify(emailVo), { headers: headers })
            .map((res: Response) => { return; })
            .catch(this.handleError);
    }

    private handleError(error: any) {
        let errMsg: string;
        if (error instanceof Response) 
        {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${err}`;
        } 
        else 
        {
            errMsg = error.message ? error.message : error.toString();
        }
        //console.error(errMsg);
        return Observable.throw(errMsg);
    }

}