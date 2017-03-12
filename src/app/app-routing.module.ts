import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TournamentComponent } from './tournament';

const routes: Routes = [
  {
    path: '',
    component: TournamentComponent,
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
