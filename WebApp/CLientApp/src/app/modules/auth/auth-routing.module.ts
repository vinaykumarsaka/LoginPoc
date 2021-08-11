import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SigninComponent} from './signin/signin.component'

const routes: Routes = [
  {path: '', pathMatch : 'full', redirectTo: 'signin'},
  {path: 'signin', pathMatch : 'full', component:SigninComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
