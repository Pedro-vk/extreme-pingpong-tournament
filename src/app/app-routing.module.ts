import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TournamentComponent, PlayersComponent } from './+tournament';

import { environment } from '../environments/environment';

const routes: Routes = [
  {path: '', component: TournamentComponent, children: [
    {path: 'players', component: PlayersComponent}
  ]},
  {path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, environment.production ? {useHash: true} : undefined)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
