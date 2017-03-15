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

  it('should shuffle the queue and set if is playing', () => {
    let state = undefined;
    state = [
      new players.AddAction(<Player>{id: 't1', name: 'test1'}),
      new players.AddAction(<Player>{id: 't2', name: 'test2'}),
      new queue.ShuffleAction(),
    ].reduce(reduceReducers, state);

    expect(state).toEqual(jasmine.objectContaining({
      isPlaying: false,
      playing: [undefined, undefined],
    }))

    state = [
      new players.AddAction(<Player>{id: 't3', name: 'test3'}),
      new players.AddAction(<Player>{id: 't4', name: 'test4'}),
      new queue.ShuffleAction(),
    ].reduce(reduceReducers, state);

    expect(state).toEqual(jasmine.objectContaining({
      isPlaying: true,
      playing: [jasmine.any(String), jasmine.any(String)],
    }))
  });

  it('should manage the queue and the players data when the match is finished', () => {
    let state = undefined;
    state = [
      new players.AddAction(<Player>{id: 't1', name: 'test1'}),
      new players.AddAction(<Player>{id: 't2', name: 'test2'}),
      new players.AddAction(<Player>{id: 't3', name: 'test3'}),
      new players.AddAction(<Player>{id: 't4', name: 'test4'}),
      new queue.ResultAction(<Player>{id: 't1'}, <Player>{id: 't2'}),
    ].reduce(reduceReducers, state);

    expect(state).toEqual(jasmine.objectContaining({
      queue: [],
      playing: [undefined, undefined],
    }));

    state = [
      new queue.ShuffleAction(),
    ].reduce(reduceReducers, state);
    state.playing = ['t1', 't2'];
    state.queue = ['t3', 't4'];
    state = [
      new players.ResetLivesAction(2),
      new queue.ResultAction(<Player>{id: 't1'}, <Player>{id: 't2'}),
    ].reduce(reduceReducers, state);

    expect(state).toEqual(jasmine.objectContaining({
      isPlaying: true,
      playing: ['t1', 't3'],
      queue: ['t4', 't2'],
    }));

    state = [
      new queue.ResultAction(<Player>{id: 't1'}, <Player>{id: 't3'}),
    ].reduce(reduceReducers, state);

    expect(state).toEqual(jasmine.objectContaining({
      playing: ['t1', 't4'],
      queue: ['t2', 't3'],
    }));

    state = [
      new queue.ResultAction(<Player>{id: 't4'}, <Player>{id: 't1'}),
      new queue.ResultAction(<Player>{id: 't4'}, <Player>{id: 't2'}),
    ].reduce(reduceReducers, state);

    expect(state).toEqual(jasmine.objectContaining({
      playing: ['t3', 't4'],
      queue: ['t1', 't2'],
    }));

    // If a dead wins, the next player can be a dead
    state = [
      new queue.ResultAction(<Player>{id: 't4'}, <Player>{id: 't3'}),
      new queue.ResultAction(<Player>{id: 't4'}, <Player>{id: 't1'}),
      new queue.ResultAction(<Player>{id: 't2'}, <Player>{id: 't4'}),
      new queue.ResultAction(<Player>{id: 't4'}, <Player>{id: 't2'}),
      // new queue.ResultAction(<Player>{id: 't2'}, <Player>{id: 't4'}),
    ].reduce(reduceReducers, state);

    expect(state).toEqual(jasmine.objectContaining({
      playing: ['t3', 't4'],
      queue: ['t1', 't2'],
    }));

    state = [
      new queue.ResultAction(<Player>{id: 't2'}, <Player>{id: 't4'}),
    ].reduce(reduceReducers, state);

    expect(state).toEqual(jasmine.objectContaining({
      isPlaying: false,
      playing: ['t3', 't4'],
      queue: ['t1', 't2'],
    }));
  });
});
