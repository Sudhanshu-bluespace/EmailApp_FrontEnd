import { Injectable } from "@angular/core";
import { Http, Headers, Response,RequestOptions, URLSearchParams } from "@angular/http";
import { Group } from "./group";
import { Observable } from "rxjs/Observable";
import { GroupSearchCriteria } from "./group_search_criteria";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class GroupService {

    private groupUrl = "groups";

    constructor(private http: Http) { }

    getAllGroups(username:string): Observable<Group[]> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let options = new RequestOptions({ headers: headers });
        let urlSearchParams = new URLSearchParams();
        urlSearchParams.append('username', username);
        let body = urlSearchParams.toString(); 
        return this.http.post(this.groupUrl+'/searchAll', body, options )
            .map(res => res.json())
            .catch(this.handleError);
    }

     getGroupById(id: number): Observable<Group> {
        return this.http.get(this.groupUrl + "/" + id)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    getAllGroupsBySearchCriteria(groupSearchCriteria: GroupSearchCriteria,username:string): Observable<Group[]> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Access-Control-Allow-Origin', '*');
        groupSearchCriteria.username = username;    
        return this.http.post(this.groupUrl + "/searchCriteria", JSON.stringify(groupSearchCriteria), { headers: headers })
            .map(res => res.json())
            .catch(this.handleError);
    }

    createGroup(group: Group): Observable<Group> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(this.groupUrl, JSON.stringify(group), { headers: headers })
            .map((res: Response) => { return; })
            .catch(this.handleError);
    }

    updateGroup(group: Group): Observable<Group> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put(this.groupUrl + "/" + group.id, JSON.stringify(group), { headers: headers })
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    deleteGroup(objectId: number): Observable<void> {
        return this.http.delete(this.groupUrl + "/" + objectId)
            .map((res: Response) => { return; })
            .catch(this.handleError);
    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

}