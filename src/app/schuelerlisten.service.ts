import {Injectable} from '@angular/core';
import {MessageService} from './message.service';
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {environment} from '../environments/environment';

const httpOptions = {
  responseType: 'blob',
  headers: new HttpHeaders({
    'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  })
};

@Injectable({
  providedIn: 'root'
})
export class SchuelerlistenService {
  private schuelerlisten_upload_uri = environment.api_base_url + '/schuelerlisten/upload';

  constructor(private http: HttpClient, private messageService: MessageService) {
  }

  uploadAndGetSchuelerliste(formData: FormData): Observable<Blob> {
    return this.http.post(this.schuelerlisten_upload_uri, formData, {responseType: 'blob'})
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
    a.download = 'schuelerliste.xlsx';
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
    this.messageService.add(`SchuelerlistenService: ${message}`);
  }

}
