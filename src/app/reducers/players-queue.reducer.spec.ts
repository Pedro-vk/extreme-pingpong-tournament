import { State, reducer, initialState } from './players-queue.reducer';

import { Player } from '../models/player';
import * as players from '../actions/players.actions';
import * as queue from '../actions/queue.actions';

const reduceReducers = (state, action) => reducer(state, action);

describe('Players/queue reducer', () => {
  it('should return the initial reducer state', () => {
    expect(reducer(undefined, {type: 'initial'})).toEqual(initialState);
  });

  it('should add a new player', () => {
    let state = [
      new players.AddAction(<Player>{id: 't', name: 'test'}),
    ].reduce(reduceReducers, undefined);

    expect(state).toEqual(jasmine.objectContaining({
      ids: ['t'],
      entities: {['t']: jasmine.objectContaining({name: 'test'})},
    }));
  });

  it('should not add a player if the id exists', () => {
    let state = [
      new players.AddAction(<Player>{id: 't', name: 'test1'}),
      new players.AddAction(<Player>{id: 't', name: 'test2'}),
    ].reduce(reduceReducers, undefined);

    expect(state).toEqual(jasmine.objectContaining({
      entities: {['t']: jasmine.objectContaining({name: 'test1'})},
    }));
  });

  it('should remove a player', () => {
    let state = [
      new players.AddAction(<Player>{id: 'r', name: 'remove'}),
      new players.RemoveAction(<Player>{id: 'r', name: 'remove'}),
      new players.AddAction(<Player>{id: 't', name: 'test'}),
      new players.RemoveAction(<Player>{id: 'u', name: 'unknown'}),
    ].reduce(reduceReducers, undefined);

    expect(state).toEqual(jasmine.objectContaining({
      ids: ['t'],
      entities: {['t']: jasmine.objectContaining({name: 'test'})},
    }));
  });

  it('should reset the lives of the players', () => {
    let state = [
      new players.AddAction(<Player>{id: 't', name: 'test'}),
      new players.ResetLivesAction(3),
    ].reduce(reduceReducers, undefined);

    expect(state).toEqual(jasmine.objectContaining({
      entities: {['t']: jasmine.objectContaining({
        lives: 3,
        initialLives: 3,
        victories: 0,
      })},
    }));
  });
});
