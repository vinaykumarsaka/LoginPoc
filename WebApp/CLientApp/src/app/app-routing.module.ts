import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './modules/auth/signin/signin.component';
import { HomeComponent } from './modules/home/home.component';

// const routes: Routes = [

//   // Redirect signed in user to the '/example'
//   //
//   // After the user signs in, the sign in page will redirect the user to the 'signed-in-redirect'
//   // path. Below is another redirection for that path to redirect the user to the desired
//   // location. This is a small convenience to keep all main routes together here on this file.
//   {path: 'signin', pathMatch : 'full', redirectTo: 'signin'},

//   // Auth routes for guests
//   {
//       path: '',
//       // canActivate: [NoAuthGuard],
//       // canActivateChild: [NoAuthGuard],
//       // component: LayoutComponent,
//       data: {
//           layout: 'empty'
//       },
//       children: [
//           // {path: 'confirmation-required', loadChildren: () => import('app/modules/auth/confirmation-required/confirmation-required.module').then(m => m.AuthConfirmationRequiredModule)},
//           // {path: 'forgot-password', loadChildren: () => import('app/modules/auth/forgot-password/forgot-password.module').then(m => m.AuthForgotPasswordModule)},
//           // {path: 'reset-password', loadChildren: () => import('app/modules/auth/reset-password/reset-password.module').then(m => m.AuthResetPasswordModule)},
//          // {path: 'signin', loadChildren: () => import('../app/modules/auth/signin/signin.module').then(m => m.SigninModule)},
//           // {path: 'sign-up', loadChildren: () => import('app/modules/auth/sign-up/sign-up.module').then(m => m.AuthSignUpModule)}
//       ]
//   },
// ];

const routes: Routes=[
  {path: '', 
    loadChildren: ()=>import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'home', pathMatch: 'full', component: HomeComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
