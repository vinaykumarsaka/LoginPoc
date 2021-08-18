import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { SocialAuthService } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  readonly endpoint = `${environment.api}/account`;
  constructor(private http :HttpClient,private _externalAuthService: SocialAuthService) { }

  public signInWithGoogle = ()=> {
    return this._externalAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
  public signOutExternal = () => {
    this._externalAuthService.signOut();
  }

  login(username: string, password: string) {
    return this.http.post<any>(`${this.endpoint}/login`, { username, password })
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.bearerToken) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));

        }
        return user;
      }));
      
  }

  externalLogin(provider: string, idToken: string) {
    return this.http.post<any>(`${this.endpoint}/externallogin`, { provider, idToken })
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.bearerToken) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));

        }
        return user;
      }));
      
  }

  register(username: string, password: string, email: string) {
    return this.http.post<any>(`${this.endpoint}/register`, { username, password, email })
      .pipe(map(user => {
        if (user) {

        }
        return user;
      }));
      
  }

  isLoggedIn(){
    let user = JSON.parse(localStorage.getItem('currentUser'));
    console.log('user', user);
    
    if(user && user.bearerToken){
      return true;
    }
      return false;
  }

  logout(){
    localStorage.setItem('currentUser', null);
  }
}
