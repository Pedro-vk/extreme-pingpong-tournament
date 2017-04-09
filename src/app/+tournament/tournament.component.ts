import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as players from '../actions/players.actions';
import * as queue from '../actions/queue.actions';
import { State, isPlaying } from '../reducers';

@Component({
  selector: 'ept-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TournamentComponent implements OnInit {
  isPlaying: Observable<boolean>;

  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.isPlaying = this.store
      .select(isPlaying);
  }

  startTournament(): void {
    this.store.dispatch(new queue.ShuffleAction());
    this.store.dispatch(new players.ResetLivesAction(3));
  }
}
