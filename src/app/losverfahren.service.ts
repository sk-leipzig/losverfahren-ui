import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import {MessageService} from './message.service';
import {LosverfahrenListe, Losverfahren} from './losverfahren';
import {environment} from '../environments/environment';
import {SchuelerlistenService} from './schuelerlisten.service';
import {SchuelerauswahlService} from './schuelerauswahl.service';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const losverfahren_service_uri = environment.api_base_url + '/api/losverfahren';

@Injectable({
  providedIn: 'root'
})
export class LosverfahrenService {

  constructor(private http: HttpClient,
              private messageService: MessageService) {
  }

  getAllLosverfahren(): Observable<Losverfahren[]> {
    this.log(`Sende GET an ${losverfahren_service_uri}`);
    return this.http.get<LosverfahrenListe>(losverfahren_service_uri, httpOptions).pipe(
      map(liste => liste._embedded.losverfahren),
      tap(losverfahren => this.log('Liste der Losverfahren erhalten')),
      catchError(this.handleError('getAllLosverfahren', []))
    );
  }

  getLosverfahren(id: string): Observable<Losverfahren> {
    this.log(`Sende GET an ${losverfahren_service_uri}/${id}`);
    return this.http.get<Losverfahren>(losverfahren_service_uri + '/' + id, httpOptions).pipe(
      tap(losverfahren => this.log('Losverfahren erhalten: ' + losverfahren.name)),
      catchError(this.handleError<any>('getLosverfahren'))
    );
  }

  createLosverfahren(losverfahren: Losverfahren): Observable<any> {
    this.log(`Sende POST an ${losverfahren_service_uri}: ${losverfahren.name}`);
    return this.http.post<Losverfahren>(losverfahren_service_uri, losverfahren, httpOptions).pipe(
      tap(_ => this.log(`neues Losverfahren mit Namen ${losverfahren.name}`)),
      catchError(this.handleError<any>('createLosverfahren'))
    );
  }

  updateLosverfahren(losverfahren: Losverfahren): Observable<any> {
    this.log(`Sende PUT an ${losverfahren_service_uri}: ${losverfahren.name}`);
    return this.http.put<Losverfahren>(losverfahren_service_uri + '/' + losverfahren.id, losverfahren, httpOptions).pipe(
      tap(_ => this.log(`Losverfahren mit Namen ${losverfahren.name} geändert`)),
      catchError(this.handleError<any>('updateLosverfahren'))
    );
  }

  deleteLosverfahren(id: number): Observable<any> {
    this.log(`Sende DELETE an ${losverfahren_service_uri}/${id}`);
    return this.http.delete<string>(losverfahren_service_uri + '/' + id, httpOptions).pipe(
      tap(_ => this.log(`Losverfahren mit id ${id} gelöscht.`)),
      catchError(this.handleError<any>('deleteLosverfahren'))
    );
  }

  uploadAndGetResult(formData: FormData): Observable<Blob> {
    const result_download_uri = environment.api_base_url + '/ergebnis/download';
    return this.http.post(result_download_uri, formData, {responseType: 'blob'})
      .pipe(
        tap(res => this.downloadFile(res))
      );
  }

  private downloadFile(blob: Blob) {
    this.log(`received ${blob}`);
    const url = window.URL.createObjectURL(blob); // <-- work with blob directly

    // create hidden dom element (so it works in all browsers)
    const a = document.createElement('a');
    a.setAttribute('style', 'display:none;');
    document.body.appendChild(a);

    // create file, attach to hidden element and open hidden element
    a.href = url;
    a.download = 'auswertung.xlsx';
    a.click();
    return url;
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
