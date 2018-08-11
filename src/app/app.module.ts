import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {LosverfahrenListeComponent} from './losverfahren-liste/losverfahren-liste.component';
import {MessagesComponent} from './messages/messages.component';
import { LosverfahrenDetailComponent } from './losverfahren-detail/losverfahren-detail.component';
import { AppRoutingModule } from './/app-routing.module';
import { KurslisteComponent } from './kursliste/kursliste.component';
import { TeilnehmernummerComponent } from './teilnehmernummer/teilnehmernummer.component';

@NgModule({
  declarations: [
    AppComponent,
    LosverfahrenListeComponent,
    MessagesComponent,
    LosverfahrenDetailComponent,
    KurslisteComponent,
    TeilnehmernummerComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
