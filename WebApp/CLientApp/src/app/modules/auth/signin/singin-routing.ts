import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent} from './signin.component'
import { Route } from '@angular/router';


export const SinginRouting : Route[] = [
  {
      path     : '',
      component: SigninComponent
  }
]
