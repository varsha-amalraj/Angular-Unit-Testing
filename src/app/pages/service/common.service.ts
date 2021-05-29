import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators'
import { StoreState } from 'src/app/store/store';
import { environment } from 'src/environments/environment';
import { TOKEN } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  options: any;
  private userDetailSource = new BehaviorSubject('default message');
  userDetails = this.userDetailSource.asObservable();
  constructor(private http: HttpClient, private store: Store<StoreState>) {
    const observer = this.store.pipe(select('authData')).subscribe((user) => {
      const headers: HttpHeaders = new HttpHeaders({
        Authorization: TOKEN
      });
      this.options = {
        headers: headers,
        observe: 'response' as 'body',
      };
    });
    // this.subscriptions.add(observer);
  }

  login(formData) {
    this.options = {
      observe: 'response',
    };
    return this.http.post(`${environment.apiURL}v1/login`, formData, this.options)
      .pipe(catchError(this.errorHandler));
  }
  getUserDetails(formData) {
    const params = {
      formData,
      ...this.options
    }
    return this.http.get(`${environment.apiURL}v1/users`, params);
  }
  updateUserDetails(userData: any) {
    this.userDetailSource.next(userData)
  }
  errorHandler(resposeError: HttpErrorResponse) {
    return throwError(resposeError.error.errors);
  }

}
