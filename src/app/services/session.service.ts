import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Session } from '../models/session';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  login(session: Session): Observable<Session> {
    return this.httpClient.post<Session>(`${environment.apiUrl}api/session.php`, session, this.httpOptions).pipe(retry(2), catchError(this.handleError))
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
