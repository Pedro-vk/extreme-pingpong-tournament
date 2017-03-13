import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { Player } from '../../models';
import * as players from '../../actions/players.actions';
import * as queue from '../../actions/queue.actions';
import { State, getPlayersList } from '../../reducers';


@Component({
  selector: 'ept-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent implements OnInit {
  players: Observable<Player[]>;

  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.players = this.store
      .select(getPlayersList);
  }

  add(name: string): void {
    this.store.dispatch(new players.AddAction(<any>{name, id: Math.random().toString(36).substr(2, 10)}));
    this.resetUsers();
  }
  remove(player: Player): void {
    this.store.dispatch(new players.RemoveAction(player));
    this.resetUsers();
  }

  resetUsers(): void {
    this.store
      .select(getPlayersList)
      .take(1)
      .subscribe((playerList: Player[]) => {
        this.store.dispatch(new queue.AddAction(playerList));
        this.store.dispatch(new queue.ShuffleAction());
        this.store.dispatch(new players.ResetLivesAction(3));
      });
  }
}
