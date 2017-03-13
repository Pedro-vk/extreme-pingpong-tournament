import { Action } from '@ngrx/store';
import { type } from './util';
import { Player } from '../models/player';

export const ActionTypes = {
  ADD:          type('queue/add'),
  SHUFFLE:      type('queue/shuffle'),
  RESULT:         type('queue/result'),
};

export class AddAction implements Action {
  type = ActionTypes.ADD;

  constructor(public payload: Player[]) { }
}
export class ShuffleAction implements Action {
  type = ActionTypes.SHUFFLE;

  constructor(public payload?: any) { }
}
export class ResultAction implements Action {
  type = ActionTypes.RESULT;
  payload: {winner: Player, loser: Player};

  constructor(winner: Player, loser: Player) {
    this.payload = {winner, loser};
  }
}

export type Actions
  = ShuffleAction
  | AddAction
  | ResultAction;
