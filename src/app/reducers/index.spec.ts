import { State, getQueuePlayers, getPlayingPlayers, getPlayersByVictories, reducer } from './index';
import { environment } from '../../environments/environment';

import { Player } from '../models/player';

describe('Reducer selectors - ', () => {
  it('reducer shouldn\'t throw', () => {
    expect(() => reducer({}, {})).not.toThrow();
    environment.production = true;
    expect(() => reducer({}, {})).not.toThrow();
  });

  it('getQueuePlayers', () => {
    let selectedData = getQueuePlayers(<State>{players: <any>{
      entities: {
        t1: <Player>{id: 't1'},
        t2: <Player>{id: 't2'},
      },
      queue: ['t1', 't2'],
    }});

    expect(selectedData).toEqual([{id: 't1'}, {id: 't2'}]);
  });

  it('getPlayingPlayers', () => {
    let selectedData = getPlayingPlayers(<State>{players: <any>{
      entities: {
        t1: <Player>{id: 't1'},
        t2: <Player>{id: 't2'},
      },
      playing: ['t1', 't2'],
    }});

    expect(selectedData).toEqual([{id: 't1'}, {id: 't2'}]);
  });

  it('getPlayersByVictories', () => {
    let selectedData = getPlayersByVictories(<State>{players: <any>{
      entities: {
        t1: <Player>{id: 't1', victories: 1, lives: 0},
        t2: <Player>{id: 't2', victories: 1, lives: 1},
        t3: <Player>{id: 't3', victories: 2, lives: 2},
      },
    }});

    expect(selectedData.map(_ => _.id)).toEqual(['t3', 't2', 't1']);
  });
});
