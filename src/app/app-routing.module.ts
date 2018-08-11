import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LosverfahrenListeComponent} from './losverfahren-liste/losverfahren-liste.component';
import {LosverfahrenDetailComponent} from './losverfahren-detail/losverfahren-detail.component';

const routes: Routes = [
  {path: '', redirectTo: '/losverfahren', pathMatch: 'full'},
  {path: 'losverfahren', component: LosverfahrenListeComponent, pathMatch: 'full'},
  {path: 'losverfahren/:id', component: LosverfahrenDetailComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}