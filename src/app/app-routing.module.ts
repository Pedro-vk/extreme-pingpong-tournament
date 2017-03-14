import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TournamentComponent, PlayersComponent } from './+tournament';

const routes: Routes = [
  {path: '', component: TournamentComponent, children: [
    {path: 'players', component: PlayersComponent}
  ]},
  {path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
