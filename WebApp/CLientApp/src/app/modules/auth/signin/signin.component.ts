import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {AuthServiceService} from '../../../services/auth-service.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SigninComponent implements OnInit {
  @ViewChild('signInNgForm') signInNgForm: NgForm;
  signInForm: FormGroup;
  constructor(private _formBuilder: FormBuilder,private authService:AuthServiceService, private router: Router) { 
    this.signInForm = this._formBuilder.group({
      email     : ['', [Validators.required, Validators.email]],
      password  : ['', Validators.required],
      rememberMe: ['']
  });
  }

  ngOnInit(): void
    {
        // Create the form
        if(this.authService.isLoggedIn())
        {
        this.router.navigate(['/home']);
        }
    }

    signIn()
    {
      debugger;
    }

    submitLogin(event)
    {
      event.preventDefault();
      let loginDetails = this.signInForm.value;
      this.authService.login(loginDetails.email, loginDetails.password)
      .subscribe(
        user => {
          if(user){
            this.router.navigate(['/home']);
            window.location.reload();
          }
        } , err => {console.log('Err', err);});
    }
}
