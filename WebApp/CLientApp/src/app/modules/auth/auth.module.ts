import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule} from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {ReactiveFormsModule,FormsModule} from '@angular/forms'
import { SigninComponent } from './signin/signin.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatCardModule} from '@angular/material/card';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSidenavModule } from '@angular/material/sidenav';

import { AuthRoutingModule } from './auth-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from '../home/home.component';


@NgModule({
  declarations: [SigninComponent, SignupComponent, HomeComponent],
  imports: [
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    RouterModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatSidenavModule,
    AuthRoutingModule,
    FlexLayoutModule
  ]
})
export class AuthModule { }
