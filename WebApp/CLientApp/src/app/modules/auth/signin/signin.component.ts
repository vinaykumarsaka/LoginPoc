import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SigninComponent implements OnInit {
  @ViewChild('signInNgForm') signInNgForm: NgForm;
  signInForm: FormGroup;
  constructor(private _formBuilder: FormBuilder) { 
    this.signInForm = this._formBuilder.group({
      email     : ['', [Validators.required, Validators.email]],
      password  : ['', Validators.required],
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

    submitLogin(event)
    {
      debugger;
    }

}
