import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { UserRegister, UserInfo } from './../models/user';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  registerUser(user: UserRegister): Observable<UserRegister> {
    return this.httpClient.post<UserRegister>(environment.apiUrl+'api/user.php', user, this.httpOptions).pipe(retry(2), catchError(this.handleError));
  }

  getInfo(): Observable<UserInfo> {
    return this.httpClient.get<UserInfo>(`${environment.apiUrl}api/user.php`).pipe(retry(2), catchError(this.handleError))
  }

  handleError(error: HttpErrorResponse) {
    let message = '';

    if(error.error instanceof ErrorEvent) {
      //erro no lado cliente
      message = error.error.message;
    } else {
      //erro no lado servidor
      message = error.error.message;
    }

    return throwError(message);
  }
}
