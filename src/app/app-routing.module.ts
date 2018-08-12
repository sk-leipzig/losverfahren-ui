import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LosverfahrenListeComponent} from './losverfahren-liste/losverfahren-liste.component';
import {LosverfahrenDetailComponent} from './losverfahren-detail/losverfahren-detail.component';
import {SchuelerauswahlComponent} from './schuelerauswahl/schuelerauswahl.component';

const routes: Routes = [
  {path: '', redirectTo: '/schuelerauswahl', pathMatch: 'full'},
  {path: 'schuelerauswahl', component: SchuelerauswahlComponent},
  {path: 'losverfahren', component: LosverfahrenListeComponent},
  {path: 'losverfahren/:id', component: LosverfahrenDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
