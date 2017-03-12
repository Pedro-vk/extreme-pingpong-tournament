import { ActionReducer, combineReducers } from '@ngrx/store'
import { compose } from '@ngrx/core/compose';
import { storeFreeze } from 'ngrx-store-freeze';
import { localStorageSync } from 'ngrx-store-localstorage';

import { createSelector } from 'reselect';

import * as fromPlayers from './players.reducer';
import { environment } from '../../environments/environment';

// App state
export interface State {
  players: fromPlayers.State;
}

// Reducers
const reducers = {
  players: fromPlayers.reducer,
};

const localStorageSyncConfig = localStorageSync(['players'], true);

const developmentReducer: ActionReducer<State> = compose(storeFreeze, localStorageSyncConfig, combineReducers)(reducers);
const productionReducer: ActionReducer<State> = compose(localStorageSyncConfig, combineReducers)(reducers);

export function reducer(state: any, action: any) {
  if (environment.production) {
    return productionReducer(state, action);
  } else {
    return developmentReducer(state, action);
  }
}

// Store selectors
// Players
export const getPlayersState = (state: State) => state.players;

export const getPlayersIds = createSelector(getPlayersState, fromPlayers.getIds);
export const getPlayersList = createSelector(getPlayersState, fromPlayers.getPlayers);
export const getPlayersByVictories = createSelector(getPlayersState, fromPlayers.getPlayersByVictories);
