import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  readonly endpoint = `${environment.api}/account`;
  constructor(private http :HttpClient) { }

  login(username: string, password: string) {
    return this.http.post<any>(`${this.endpoint}.login`, { username, password })
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));

        }
        return user;
      }));
  }
}
