import { Component, OnInit } from '@angular/core';
import { RegistrationService } from "./registration.service";
import { UserRegistration } from '../model/user_registration';
import { Message } from "../../message";
import { Router, ActivatedRoute, Params } from '@angular/router';

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

  constructor( private router: Router,private registerService: RegistrationService) { }

  ngOnInit() {
    this.user = {
            username: '',
            password: '',
            confirmPassword: '',
			email: '',
      companyName: '',
      phone: ''
        }
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

}
