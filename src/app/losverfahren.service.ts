import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {FileSelectDirective, FileDropDirective, FileUploader} from 'ng2-file-upload/ng2-file-upload';
import {catchError, map, tap} from 'rxjs/operators';
import {MessageService} from './message.service';
import {LosverfahrenListe, Losverfahren} from './losverfahren';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class LosverfahrenService {

  private losverfahren_service_uri = 'http://localhost:8080/losverfahren';

  constructor(private http: HttpClient, private messageService: MessageService) {
  }

  getAllLosverfahren(): Observable<Losverfahren[]> {
    this.log(`Sende GET an ${this.losverfahren_service_uri}`);
    return this.http.get<LosverfahrenListe>(this.losverfahren_service_uri).pipe(
      map(liste => liste._embedded.losverfahren),
      tap(losverfahren => this.log('Liste der Losverfahren erhalten')),
      catchError(this.handleError('getAllLosverfahren', []))
    );
  }

  getLosverfahren(id: string): Observable<Losverfahren> {
    this.log(`Sende GET an ${this.losverfahren_service_uri}/${id}`);
    return this.http.get<Losverfahren>(this.losverfahren_service_uri + '/' + id).pipe(
      tap(losverfahren => this.log('Losverfahren erhalten: ' + losverfahren.name)),
      catchError(this.handleError('getLosverfahren', new Losverfahren('Losverfahren mit id=${id} nicht gefunden!')))
    );
  }

  createLosverfahren(losverfahren: Losverfahren): Observable<any> {
    this.log(`Sende POST an ${this.losverfahren_service_uri}: ${losverfahren.name}`);
    return this.http.post<Losverfahren>(this.losverfahren_service_uri, losverfahren, httpOptions).pipe(
      tap(_ => this.log(`neues Losverfahren mit Namen ${losverfahren.name}`)),
      catchError(this.handleError<any>('createLosverfahren'))
    );
  }

  updateLosverfahren(losverfahren: Losverfahren): Observable<any> {
    this.log(`Sende PUT an ${this.losverfahren_service_uri}: ${losverfahren.name}`);
    return this.http.put<Losverfahren>(this.losverfahren_service_uri + '/' + losverfahren.id, losverfahren, httpOptions).pipe(
      tap(_ => this.log(`Losverfahren mit Namen ${losverfahren.name} geändert`)),
      catchError(this.handleError<any>('updateLosverfahren'))
    );
  }

  deleteLosverfahren(id: string): Observable<any> {
    this.log(`Sende DELETE an ${this.losverfahren_service_uri}/${id}`);
    return this.http.delete<string>(this.losverfahren_service_uri + '/' + id).pipe(
      tap(_ => this.log(`Losverfahren mit id ${id} gelöscht.`)),
      catchError(this.handleError<any>('deleteLosverfahren'))
    );
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`LosverfahrenService: ${message}`);
  }
}
