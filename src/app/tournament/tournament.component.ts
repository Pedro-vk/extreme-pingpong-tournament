import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Player } from '../models';
import * as players from '../actions/players.actions';
import { State } from '../reducers';

@Component({
  selector: 'ept-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TournamentComponent implements OnInit {
  players: Observable<Player[]>;

  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.players = this.store
      .select((state: State) => Object.values(state.players.entities));

    this.store.dispatch(new players.AddAction(<any>{id: 1, name: 'Test'}))
    this.store.dispatch(new players.AddAction(<any>{id: 2, name: 'Vs.'}))
    this.store.dispatch(new players.ResetLivesAction(3))
    this.store.dispatch(new players.WinAction(<any>{id: 2}))
    this.store.dispatch(new players.LoseAction(<any>{id: 1}))
    this.store.dispatch(new players.LoseAction(<any>{id: 2}))
    this.store.dispatch(new players.LoseAction(<any>{id: 1}))
  }

}
