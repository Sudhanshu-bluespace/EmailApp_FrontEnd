import { Component, OnInit } from '@angular/core';
import { RegistrationService } from "./registration.service";
import { UserRegistration } from '../model/user_registration';
import { Message } from "../../message";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Country } from '../model/Country';
import { State } from '../model/State';
import { City } from '../model/City';
import { Item } from '../model/item';
import {SelectModule} from 'ng2-select';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  providers: [RegistrationService]
})
export class RegistrationComponent implements OnInit {

  submitted = false;
  user: UserRegistration;
  msgs: Message[] = [];
  registered: boolean = false;
  disabled:boolean = false;
  countries:Country[]=[];
  countryItems:Item[]=[];
  item:Item;
  states:State[]=[];
  cities:City[]=[];
  value:any = {};
  _disabledV:string = '0';
  country_dropdown_disabled:boolean = false;

  constructor( private router: Router,private registerService: RegistrationService) {

    console.log("in construct..");
    this.getCountries();
   }

  ngOnInit() {
    console.log("in init");
    this.user = {
            username: '',
            password: '',
            confirmPassword: '',
			email: '',
      companyName: '',
      phone: '',
      address:'',
      country:'',
      state:'',
      city:'',
      street:'',
      zipcode:'',
      federalId:''
        }
  }

  clearForm()
  {
    console.log("in clear form");
    this.user = {
            username: '',
            password: '',
            confirmPassword: '',
			email: '',
      companyName: '',
      phone: '',
      address:'',
      country:'',
      state:'',
      city:'',
      street:'',
      zipcode:'',
      federalId:''
        }
  }

  getCountries()
  {
    this.registerService.getCountries()
                .subscribe((data) => {
                 this.countries = data;
                 console.log("Countries loaded with "+this.countries.length+" size");
                 for(let cnt of this.countries)
                 {
                    let item = new Item();
                    item.id = cnt.id;
                    item.text = cnt.fullName;
                    this.countryItems.push(item);
                 }

    console.log("countries populated with size : "+this.countryItems.length);
            },
            error => {
              console.error("Failed to get country list");
            });
  }

  getStates(fullName:string)
  {
    console.log(fullName+" passed as argument to get states ");
    this.registerService.getStates(fullName)
                .subscribe((data) => {
                  this.states = data;
            },
            error => {
              console.error("Failed to get state list");
            });
  }

   getCities(name:string)
  {
    console.log(name+" passed as argument to get states");
    this.registerService.getCities(name)
                .subscribe((data) => {
                 this.cities = data;
            },
            error => {
              console.error("Failed to get city list");
            });
  }

  onSubmit() {
    this.submitted = true;
	  this.disabled = true;
    this.register(this.user);
  }

  register(model: UserRegistration) {
    this.registerService.register(model)
            .subscribe((data) => {
                 console.log(data);
				 this.disabled = false;
				 this.msgs.push({ severity: "info", summary: "Registration Successful", detail: "Registration request has been sent to the administrator and awaiting approval. Please check your email for details on account activation." });
				 this.registered = false;
         this.clearForm();
         this.router.navigate(['/appRegister']);
				 //this.router.navigate(['/appLogin']);
            },
            error => {
                this.msgs.push({ severity: "error", summary: "Registration Failed", detail: error });
				        this.registered = false;
				        this.disabled = false;
            });
  };
  
  home()
  {
	  this.router.navigate(['/']);
  }
  
  showDialog() 
  {
      this.registered = true;
  }
 
  private get disabledV():string {
    return this._disabledV;
  }
 
  private set disabledV(value:string) {
    this._disabledV = value;
    this.disabled = this._disabledV === '1';
  }
 
  public selected(value:any):void {
    console.log('Selected value is: ', value);
  }
 
  public removed(value:any):void {
    console.log('Removed value is: ', value);
  }
 
  public typed(value:any):void {
    console.log('New search input: ', value);
  }
 
  public refreshValue(value:any):void {
    this.value = value;
  }

}
