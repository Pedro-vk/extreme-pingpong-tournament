import { Action } from '@ngrx/store';
import { type } from './util';
import { Player } from '../models/player';

export const ActionTypes = {
  MULTIADD:  type('players - multiadd'),
  ADD:       type('players - add'),
  UPDATE:    type('players - update'),
  WIN:       type('players - win'),
  LOSE:      type('players - lose'),
  RESET:     type('players - reset'),
};

export class MultiaddAction implements Action {
  type = ActionTypes.MULTIADD;

  constructor(public payload: Player[]) { }
}
export class AddAction implements Action {
  type = ActionTypes.ADD;

  constructor(public payload: Player) { }
}
export class UpdateAction implements Action {
  type = ActionTypes.UPDATE;

  constructor(public payload: Player) { }
}
export class WinAction implements Action {
  type = ActionTypes.WIN;

  constructor(public payload: Player) { }
}
export class LoseAction implements Action {
  type = ActionTypes.LOSE;

  constructor(public payload: Player) { }
}
export class ResetAction implements Action {
  type = ActionTypes.RESET;

  constructor(public payload: Player) { }
}

export type Actions
  = MultiaddAction
  | AddAction
  | UpdateAction
  | WinAction
  | LoseAction
  | ResetAction;
