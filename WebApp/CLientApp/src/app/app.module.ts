import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientJsonpModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderInterceptor } from './interceptors/header.interceptor';
import { HeaderComponent } from './layout/header/header.component';
import { AuthServiceService } from './services/auth-service.service';
import { HttpClientModule } from '@angular/common/http';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { HomeComponent } from './modules/home/home.component';
import { SharedService } from './services/shared/shared.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    HttpClientModule
  ],
  providers: [
    AuthServiceService,
    { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true },
     { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
     HomeComponent,
     SharedService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
