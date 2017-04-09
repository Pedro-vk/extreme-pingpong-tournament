import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Player } from '../../models';
import * as players from '../../actions/players.actions';
import * as queue from '../../actions/queue.actions';
import { State, getPlayersList } from '../../reducers';


@Component({
  selector: 'ept-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayersComponent implements OnInit {
  name: string;
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

  trackById(index: number, object: any): string {
    return object.id || undefined;
  }

  resetUsers(): void {
    this.store.dispatch(new queue.ShuffleAction());
    this.store.dispatch(new players.ResetLivesAction(3));
  }
}
