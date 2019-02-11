import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient) { }

  // login(username: string, password: string) {
  //   return this.http.post<any>(`/perform_login`, { username: username, password: password })
  //     .pipe(map(user => {
  //       // login successful if there's a jwt token in the response
  //       if (user && user.token) {
  //         // store user details and jwt token in local storage to keep user logged in between page refreshes
  //         localStorage.setItem('currentUser', JSON.stringify(user));
  //       }
  //
  //       return user;
  //     }));
  // }

  login(username: string, password: string) {
    const data = new FormData();
    data.append('username',username);
    data.append('password',password);
    data.append('submit','submit')
    return this.http.post<any>(`/perform_login`,data);
      // .subscribe(value => {
      //   console.log(value);
      //   return value;
      // })
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
}
