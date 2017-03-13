import { Action } from '@ngrx/store';
import { type } from './util';
import { Player } from '../models/player';

export const ActionTypes = {
  MULTIADD:     type('players/multiadd'),
  ADD:          type('players/add'),
  REMOVE:       type('players/remove'),
  UPDATE:       type('players/update'),
  RESET:        type('players/reset'),
  RESET_LIVES:  type('players/reset-lives'),
};

export class MultiaddAction implements Action {
  type = ActionTypes.MULTIADD;

  constructor(public payload: Player[]) { }
}
export class AddAction implements Action {
  type = ActionTypes.ADD;

  constructor(public payload: Player) { }
}
export class RemoveAction implements Action {
  type = ActionTypes.REMOVE;

  constructor(public payload: Player) { }
}
export class UpdateAction implements Action {
  type = ActionTypes.UPDATE;

  constructor(public payload: Player) { }
}
export class ResetAction implements Action {
  type = ActionTypes.RESET;

  constructor(public payload: Player) { }
}
export class ResetLivesAction implements Action {
  type = ActionTypes.RESET_LIVES;

  constructor(public payload: number) { }
}


export type Actions
  = MultiaddAction
  | AddAction
  | RemoveAction
  | UpdateAction
  | ResetAction
  | ResetLivesAction;
