import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {LosverfahrenListeComponent} from './losverfahren-liste/losverfahren-liste.component';
import {MessagesComponent} from './messages/messages.component';
import {LosverfahrenDetailComponent} from './losverfahren-detail/losverfahren-detail.component';
import {AppRoutingModule} from './/app-routing.module';
import {KurslisteComponent} from './kursliste/kursliste.component';
import {TeilnehmernummerComponent} from './teilnehmernummer/teilnehmernummer.component';
import {SchuelerauswahlComponent} from './schuelerauswahl/schuelerauswahl.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    LosverfahrenListeComponent,
    MessagesComponent,
    LosverfahrenDetailComponent,
    KurslisteComponent,
    TeilnehmernummerComponent,
    SchuelerauswahlComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
