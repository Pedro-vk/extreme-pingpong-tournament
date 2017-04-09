import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';

import { Player } from '../../models';
import * as players from '../../actions/players.actions';
import * as queue from '../../actions/queue.actions';
import { State, getPlayersByVictories, getQueuePlayers, getPlayingPlayers, isPlaying, getMaxVictories } from '../../reducers';

@Component({
  selector: 'ept-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameComponent implements OnInit {

  leaderboard: Observable<Player[]>;
  playing: Observable<Player[]>;
  queue: Observable<Player[]>;
  isPlaying: Observable<boolean>;
  maxVictories: Observable<number>;

  constructor(private store: Store<State>) { }

  ngOnInit() {
    const livesToArray = (players: Player[]) => {
      return players
        .filter(_ => _)
        .map((player: Player) => <any>({
          ...player,
          livesList: [
            ...Array(player.lives).fill(true),
            ...Array(player.initialLives - player.lives).fill(false),
          ]
        }));
    };

    this.leaderboard = this.store
      .select(getPlayersByVictories)
      .map(livesToArray);
    this.playing = this.store
      .select(getPlayingPlayers)
      .map(livesToArray);
    this.queue = this.store
      .select(getQueuePlayers);
    this.isPlaying = this.store
      .select(isPlaying);
    this.maxVictories = this.store
      .select(getMaxVictories);
  }

  startTournament(): void {
    this.store.dispatch(new queue.ShuffleAction());
    this.store.dispatch(new players.ResetLivesAction(3));
  }

  matchFinished(winner: Player, loser: Player): void {
    this.store.dispatch(new queue.ResultAction(winner, loser));
  }
}
