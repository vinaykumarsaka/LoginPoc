import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  @ViewChild('signUpNgForm') signInNgForm: NgForm;
  signUpForm: FormGroup;
  constructor(private _formBuilder: FormBuilder,private authService:AuthServiceService, private router: Router) { 
    this.signUpForm = this._formBuilder.group({
      email     : ['', [Validators.required, Validators.email]],
      password  : ['', Validators.required],
      username  : ['', Validators.required],
      rememberMe: ['']
  });
  }

  ngOnInit(): void
    {
        // Create the form
       
    }

    signIn()
    {
      debugger;
    }

    submitRegister(event)
    {
      event.preventDefault();
      let signupDetails = this.signUpForm.value;
      this.authService.register(signupDetails.username, signupDetails.password, signupDetails.email)
      .subscribe(
        data => {
          if(data){
            this.router.navigate(['/signin']);
          }
        }, err => {console.log('Err', err);}
        );
        // (error: HttpErrorResponse) => {

        //   this.messageService.add({ severity: 'error', summary: 'Error Message', detail: error.error });
        //   this.submitClick = false;
        // });
    }

}
