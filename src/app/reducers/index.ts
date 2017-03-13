import { ActionReducer, combineReducers } from '@ngrx/store'
import { compose } from '@ngrx/core/compose';
import { storeFreeze } from 'ngrx-store-freeze';
import { localStorageSync } from 'ngrx-store-localstorage';

import { createSelector } from 'reselect';

import { Player } from '../models';

import * as fromPlayersQueue from './players-queue.reducer';
import { environment } from '../../environments/environment';

// App state
export interface State {
  players: fromPlayersQueue.State;
}

// Reducers
const reducers = {
  players: fromPlayersQueue.reducer,
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

export const getPlayersIds = createSelector(getPlayersState, fromPlayersQueue.getIds);
export const getPlayerEntities = createSelector(getPlayersState, fromPlayersQueue.getPlayerEntities);
export const getPlayersList = createSelector(getPlayersState, fromPlayersQueue.getPlayers);
export const getPlayersByVictories = createSelector(getPlayersState, fromPlayersQueue.getPlayersByVictories);

export const getMaxVictories = createSelector(getPlayersList, (players: Player[]) => {
  return players
    .reduce((acc: number, player: Player) => Math.max(acc, player.victories), 0);
});

// Queue
export const getQueue = createSelector(getPlayersState, fromPlayersQueue.getQueue);
export const getPlaying = createSelector(getPlayersState, fromPlayersQueue.getPlaying);
export const isPlaying = createSelector(getPlayersState, fromPlayersQueue.isPlaying);

// Player + Queue
export const getQueuePlayers = createSelector(getQueue, getPlayerEntities, (queue: string[], players: {[id: string]: Player}) => {
  return queue.map((id: string) => players[id]);
});
export const getPlayingPlayers = createSelector(getPlaying, getPlayerEntities, (queue: string[], players: {[id: string]: Player}) => {
  return queue.map((id: string) => players[id]);
});
