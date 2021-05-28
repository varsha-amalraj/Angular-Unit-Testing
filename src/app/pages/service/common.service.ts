import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  options: any;
  constructor(private http: HttpClient) { }

  login(formData) {
    this.options = {
      observe: 'response',
    };
    return this.http.post(`${environment.apiURL}v1/login`, formData, this.options)
      .pipe(catchError(this.errorHandler));
  }
  errorHandler(resposeError: HttpErrorResponse) {
    return throwError(resposeError.error.errors);
  }

}
