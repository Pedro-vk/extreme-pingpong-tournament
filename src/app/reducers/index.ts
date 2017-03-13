import { ActionReducer, combineReducers } from '@ngrx/store'
import { compose } from '@ngrx/core/compose';
import { storeFreeze } from 'ngrx-store-freeze';
import { localStorageSync } from 'ngrx-store-localstorage';

import { createSelector } from 'reselect';

import { Player } from '../models';

import * as fromPlayers from './players.reducer';
import * as fromQueue from './queue.reducer';
import { environment } from '../../environments/environment';

// App state
export interface State {
  players: fromPlayers.State;
  queue: fromQueue.State;
}

// Reducers
const reducers = {
  players: fromPlayers.reducer,
  queue: fromQueue.reducer,
};

const localStorageSyncConfig = localStorageSync(['players', 'queue'], true);

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
export const getPlayerEntities = createSelector(getPlayersState, fromPlayers.getPlayerEntities);
export const getPlayersList = createSelector(getPlayersState, fromPlayers.getPlayers);
export const getPlayersByVictories = createSelector(getPlayersState, fromPlayers.getPlayersByVictories);

// Queue
export const getQueueState = (state: State) => state.queue;

export const getQueue = createSelector(getQueueState, fromQueue.getQueue);
export const getPlaying = createSelector(getQueueState, fromQueue.getPlaying);

export const getQueuePlayers = createSelector(getQueue, getPlayerEntities, (queue: string[], players: {[id: string]: Player}) => {
  return queue.map((id: string) => players[id]);
});
export const getPlayingPlayers = createSelector(getPlaying, getPlayerEntities, (queue: string[], players: {[id: string]: Player}) => {
  return queue.map((id: string) => players[id]);
});
