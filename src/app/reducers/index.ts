import { ActionReducer, combineReducers } from '@ngrx/store'
import { compose } from '@ngrx/core/compose';
import { storeFreeze } from 'ngrx-store-freeze';

import * as fromPlayers from './players.reducer';
import { environment } from '../../environments/environment';


export interface State {
  players: fromPlayers.State;
}

const reducers = {
  players: fromPlayers.reducer,
};

const developmentReducer: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers);
const productionReducer: ActionReducer<State> = combineReducers(reducers);

export function reducer(state: any, action: any) {
  if (environment.production) {
    return productionReducer(state, action);
  } else {
    return developmentReducer(state, action);
  }
}
