import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TournamentComponent, PlayersComponent, GameComponent } from './+tournament';

import { environment } from '../environments/environment';

const routes: Routes = [
  {path: '', component: TournamentComponent, children: [
    {path: '', component: GameComponent},
    {path: 'players', component: PlayersComponent},
  ]},
  {path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: environment.useHash})],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
