import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {EmptyObservable} from 'rxjs/observable/EmptyObservable';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import {MessageService} from './message.service';
import {LosverfahrenService} from './losverfahren.service';
import {Losverfahren} from './losverfahren';
import {Schuelerliste} from './schuelerlisten';
import {flatMap} from 'rxjs/internal/operators';
import {SchuelerAuswahl} from './schuelerAuswahl';
import {Schueler} from './schueler';
import {environment} from '../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

export class SchuelerUndLosverfahren {
  schueler: Schueler;
  losverfahren: Losverfahren;
}

@Injectable({
  providedIn: 'root'
})
export class SchuelerauswahlService {

  constructor(private http: HttpClient,
              private messageService: MessageService,
              private losverfahrenService: LosverfahrenService) {
  }

  getLosverfahrenForKennung(kennung: string): Observable<SchuelerUndLosverfahren> {
    const schuelerlisten_searchByKennung_uri = environment.api_base_url
      + `/api/schuelerlisten/search/findBySchuelerListeKennung?kennung=${kennung}`;
    this.log(`Sende GET an ${schuelerlisten_searchByKennung_uri}`);
    const schuelerUndLosverfahren = new SchuelerUndLosverfahren();
    return this.http.get<Schuelerliste>(schuelerlisten_searchByKennung_uri).pipe(
      flatMap(schuelerliste => {
        if (schuelerliste !== null) {
          this.log(`Schülerliste für kennung=${kennung} gefunden: `);
          schuelerUndLosverfahren.schueler = schuelerliste.schuelerListe.find(schueler => schueler.kennung === kennung);
          return this.losverfahrenService.getLosverfahren(schuelerliste.losverfahrenId).pipe(
            tap(losverfahren => this.log('Losverfahren erhalten: ' + losverfahren.name)),
            map(losverfahren => {
                schuelerUndLosverfahren.losverfahren = losverfahren;
                return schuelerUndLosverfahren;
              }
            )
          );
        } else {
          return new EmptyObservable();
        }
      }),
      catchError(this.handleErrorIgnoreNotFound<any>(`getLosverfahrenForKennung`))
    );
  }

  updateSchuelerAuswahl(schuelerAuswahl: SchuelerAuswahl): Observable<any> {
    const schuelerAuswahl_service_url = environment.api_base_url + '/api/schuelerauswahl';
    this.log(`Sende POST an ${schuelerAuswahl_service_url} für Kennung: ${schuelerAuswahl.schueler.kennung}`);
    this.log(JSON.stringify(schuelerAuswahl));
    return this.http.post<SchuelerAuswahl>(schuelerAuswahl_service_url, schuelerAuswahl, httpOptions).pipe(
      tap(_ => this.log(`Schülerauswahl für Kennung ${schuelerAuswahl.schueler.kennung} geändert`)),
      catchError(this.handleError<any>('updateSchuelerAuswahl'))
    );
  }

  private handleErrorIgnoreNotFound<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      if (error.status !== 404) {
        this.handleError(operation, result);
      } else {
        return new EmptyObservable();
      }
    };
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
      this.log(`${operation} failed: ` + JSON.stringify(error));

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`SchuelerauswahlService: ${message}`);
  }
}
