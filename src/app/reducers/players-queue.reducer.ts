import { Player } from '../models/player';
import * as players from '../actions/players.actions';
import * as queue from '../actions/queue.actions';

export interface State {
  ids: string[];
  entities: { [id: string]: Player };
  queue: string[];
  playing: [string, string];
  isPlaying: boolean;
};

export const initialState: State = {
  ids: [],
  entities: {},
  queue: [],
  playing: [undefined, undefined],
  isPlaying: false,
};

export function reducer(state: State = {...initialState}, action: players.Actions | queue.Actions): State {
  switch (action.type) {

    // Add/Remove/Update players
    case players.ActionTypes.ADD: {
      let player = <Player>action.payload;
      return state.ids.indexOf(player.id) !== -1 ? state : {
        ...state,
        ids: [...state.ids, player.id],
        entities: {...state.entities, [player.id]: resetPlayer(player)},
      };
    }
    case players.ActionTypes.REMOVE: {
      let player = <Player>action.payload;
      let newEntites = {...state.entities};
      delete newEntites[player.id];
      return state.ids.indexOf(player.id) === -1 ? state : {
        ...state,
        ids: state.ids.filter((id: string) => id !== player.id),
        entities: newEntites,
      };
    }

    // When a match is finished
    case queue.ActionTypes.RESULT: {
      let winner = action.payload.winner;
      let loser = action.payload.loser;
      let playing = <any>[...state.playing];
      let queue = [...state.queue, loser.id];
      let isPlaying = true;

      if (playing[0] === undefined || playing[1] === undefined) {
        console.warn('Queue not shuffled');
        return state;
      }

      winner = {...state.entities[winner.id]};
      loser = {...state.entities[loser.id]};
      if (winner.lives !== 0) {
        winner.victories++;
      }
      if (loser.lives !== 0) {
        loser.lives--;
      }

      let nextPlayerId = queue[0];
      if (!winner.lives) {
        let nextAlive = queue
          .map((id: string) => state.entities[id])
          .find((player: Player) => !!player.lives);
        if (nextAlive.id === loser.id && !loser.lives) {
          isPlaying = false;
          queue.pop(); // Remove the added last player
        } else {
          let nextAliveId = state.queue.indexOf(nextAlive.id);
          playing[playing.indexOf(loser.id)] = queue.splice(nextAliveId, 1).pop();
          queue.push(...queue.splice(0, nextAliveId));
        }
      } else {
        playing[playing.indexOf(loser.id)] = queue.splice(0, 1).pop();
      }

      return state.ids.indexOf(winner.id) === -1 || state.ids.indexOf(loser.id) === -1 ? state : {
        ...state,
        entities: {
          ...state.entities,
          [winner.id]: winner,
          [loser.id]: loser,
        },
        queue,
        playing,
        isPlaying,
      };
    }

    // Reset lives
    case players.ActionTypes.RESET_LIVES: {
      let lives = +action.payload;
      return {
        ...state,
        entities: Object.values(state.entities)
          .map((player: Player) => ({...player, lives, initialLives: lives, victories: 0}))
          .reduce((accPlayers, player: Player) => ({...accPlayers, [player.id]: player}), {}),
      };
    }

    // Mix the queue
    case queue.ActionTypes.SHUFFLE: {
      let queue = Object.values(state.entities)
        .map((player: Player) => player.id);
      if (queue.length < 3) {
        console.warn('Queue needs 3 or more players');
        return {
          ...state,
          isPlaying: false,
        };
      }
      let shuffledQueue = [];
      do {
        let randomIndex = Math.floor(Math.random() * queue.length);
        shuffledQueue.push(queue.splice(randomIndex, 1).pop());
      } while (queue.length)
      return {
        ...state,
        isPlaying: true,
        playing: <any>shuffledQueue.slice(0, 2),
        queue: shuffledQueue.slice(2),
      }
    }

    default: {
      return state;
    }
  }
}

function resetPlayer({id, name}: Player): Player {
  return {
    id: id || Math.random().toString(36).substr(2, 10),
    name,
    lives: 0,
    initialLives: 0,
    victories: 0,
  };
}

// Players
export const getIds = (state: State) => state.ids;

export const getPlayerEntities = (state: State) => state.entities;

export const getPlayers = (state: State) => Object.values(state.entities);

export const getPlayersByVictories = (state: State) =>
  Object.values(state.entities)
    .sort((a: Player, b: Player) => {
      if (a.victories === b.victories) {
        return b.lives - a.lives;
      }
      return b.victories - a.victories;
    });

// Queue
export const getQueue = (state: State) => state.queue;

export const getPlaying = (state: State) => state.playing;

export const isPlaying = (state: State) => state.isPlaying;
