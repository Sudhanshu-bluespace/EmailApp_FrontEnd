import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod, URLSearchParams } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { UserRegistration } from '../model/user_registration';
import { Country } from '../model/Country';
import { State } from '../model/State';
import { City } from '../model/City';

@Injectable()
export class RegistrationService{

    constructor(private http: Http){}

    register (model: UserRegistration):  Observable<UserRegistration>  {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let requestOptions = new RequestOptions({
          method: RequestMethod.Post,
          headers: headers,
          body: JSON.stringify(model)
        })
        let body= JSON.stringify(model);
        console.log(body);
        return this.http.post('new/register', body, requestOptions ).catch(this.handleError);     
  }

  getCountries():Observable<Country[]> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.get('new/getCountries')
        .map((res: Response) => res.json())
        .catch(this.handleError);     

  }

  getStates(fullName:string):Observable<State[]> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('new/getStatesFromCountry/'+fullName, { headers: headers })
            .map(res => res.json())
            .catch(this.handleError);    

  }

  getCities(name:string):Observable<City[]> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('new/getCitiesFromState/'+name, { headers: headers })
            .map(res => res.json())
            .catch(this.handleError);      

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