import { Action } from '@ngrx/store';
import { type } from './util';
import { Player } from '../models/player';

export const ActionTypes = {
  ADD:          type('players/add'),
  REMOVE:       type('players/remove'),
  RESET_LIVES:  type('players/reset-lives'),
};

export class AddAction implements Action {
  type = ActionTypes.ADD;

  constructor(public payload: Player) { }
}
export class RemoveAction implements Action {
  type = ActionTypes.REMOVE;

  constructor(public payload: Player) { }
}
export class ResetLivesAction implements Action {
  type = ActionTypes.RESET_LIVES;

  constructor(public payload: number) { }
}


export type Actions
  = AddAction
  | RemoveAction
  | ResetLivesAction;
