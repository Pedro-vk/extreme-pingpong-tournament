import { Player } from '../models/player';
import * as queue from '../actions/queue.actions';


export interface State {
  queue: string[];
  playing: [string, string];
  isPlaying: boolean;
};

export const initialState: State = {
  queue: [],
  playing: [undefined, undefined],
  isPlaying: false,
};

export function reducer(state: State = initialState, action: queue.Actions): State {
  switch (action.type) {

    case queue.ActionTypes.ADD: {
      return {
        ...state,
        queue: (<Player[]>action.payload).map((player: Player) => player.id),
      };
    }

    case queue.ActionTypes.SHUFFLE: {
      let queue = [...state.queue, ...state.playing.filter(_ => _)]
        .filter((id, i, list) => list.indexOf(id) === i);
      if (queue.length < 3) {
        console.warn('Queue needs 3 or more players');
        return state;
      }
      let shuffledQueue = [];
      do {
        let randomIndex = Math.floor(Math.random() * queue.length);
        shuffledQueue.push(queue.splice(randomIndex, 1).pop());
      } while (queue.length)
      return {
        ...state,
        playing: <any>shuffledQueue.slice(0, 2),
        queue: shuffledQueue.slice(2),
      }
    }

    case queue.ActionTypes.RESULT:
    case queue.ActionTypes.NEXT: {
      let player = <Player>(action.payload.loser || action.payload);
      let playing = <any>[...state.playing];
      let queue = [...state.queue, player.id];
      if (playing[0] === undefined || playing[1] === undefined) {
        console.warn('Queue not shuffled');
        return state;
      }
      playing[playing.indexOf(player.id)] = queue.splice(0, 1)[0];
      return {
        ...state,
        queue,
        playing,
      };
    }

    default: {
      return state;
    }
  }
}

export const getQueue = (state: State) => state.queue;

export const getPlaying = (state: State) => state.playing;
