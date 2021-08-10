import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule} from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {ReactiveFormsModule,FormsModule} from '@angular/forms'
import { SigninComponent } from './signin.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {SinginRouting} from './singin-routing'



@NgModule({
  declarations: [SigninComponent],
  imports: [
    RouterModule.forChild(SinginRouting),
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    RouterModule,
    MatProgressSpinnerModule
  ]
})
export class SigninModule { }
