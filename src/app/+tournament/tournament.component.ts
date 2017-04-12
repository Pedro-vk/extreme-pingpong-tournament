import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { Player } from '../models';
import * as players from '../actions/players.actions';
import * as queue from '../actions/queue.actions';
import { State, getPlayersList } from '../reducers';

@Component({
  selector: 'ept-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TournamentComponent implements OnInit {
  canRestart: Observable<boolean>;

  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.canRestart = this.store
      .select(getPlayersList)
      .map((queue: Player[]) => queue.length >= 3);
  }

  startTournament(): void {
    this.store.dispatch(new queue.ShuffleAction());
    this.store.dispatch(new players.ResetLivesAction(3));
  }
}
