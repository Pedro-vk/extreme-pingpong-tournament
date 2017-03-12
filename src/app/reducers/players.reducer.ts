import { Player } from '../models/player';
import * as players from '../actions/players.actions';


export interface State {
  ids: string[];
  entities: { [id: string]: Player };
};

export const initialState: State = {
  ids: [],
  entities: {},
};

export function reducer(state: State = initialState, action: players.Actions): State {
  switch (action.type) {

    case players.ActionTypes.MULTIADD: {
      let playerList = <Player[]>action.payload;
      return playerList
        .reduce((accState: State, player: Player) => ({
          ids: [...accState.ids, player.id],
          entities: {...accState.entities, [player.id]: resetPlayer(player)},
        }), state);
    }

    case players.ActionTypes.ADD: {
      let player = <Player>action.payload;
      return state.ids.indexOf(player.id) !== -1 ? state : {
        ids: [...state.ids, player.id],
        entities: {...state.entities, [player.id]: resetPlayer(player)},
      };
    }

    case players.ActionTypes.REMOVE: {
      let player = <Player>action.payload;
      let newEntites = {...state.entities};
      delete newEntites[player.id];
      return state.ids.indexOf(player.id) === -1 ? state : {
        ids: state.ids.filter((id: string) => id !== player.id),
        entities: newEntites,
      };
    }

    case players.ActionTypes.UPDATE: {
      let player = <Player>action.payload;
      return state.ids.indexOf(player.id) === -1 ? state : {
        ids: [...state.ids, player.id],
        entities: {...state.entities, [player.id]: resetPlayer(player)},
      };
    }

    case players.ActionTypes.WIN: {
      let player = <Player>action.payload;
      let statePlayer = <Player>state.entities[player.id];
      return state.ids.indexOf(player.id) === -1 ? state : {
        ...state,
        entities: {...state.entities, [player.id]: {...statePlayer, victories: statePlayer.victories + 1}},
      };
    }

    case players.ActionTypes.LOSE: {
      let player = <Player>action.payload;
      let statePlayer = <Player>state.entities[player.id];
      return state.ids.indexOf(player.id) === -1 ? state : {
        ...state,
        entities: {...state.entities, [player.id]: {...statePlayer, lives: statePlayer.lives - 1}},
      };
    }

    case players.ActionTypes.RESET: {
      let player = <Player>action.payload;
      return state.ids.indexOf(player.id) === -1 ? state : {
        ...state,
        entities: {...state.entities, [player.id]: resetPlayer(player)},
      };
    }

    case players.ActionTypes.RESET_LIVES: {
      let lives = +action.payload;
      return {
        ...state,
        entities: Object.values(state.entities)
          .map((player: Player) => ({...player, lives, initialLives: lives}))
          .reduce((accPlayers, player: Player) => ({...accPlayers, [player.id]: player}), {}),
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

export const getIds = (state: State) => state.ids;

export const getPlayers = (state: State) => Object.values(state.entities);

export const getPlayersByVictories = (state: State) =>
  Object.values(state.entities)
    .sort((a: Player, b: Player) => {
      if (a.victories === b.victories) {
        return b.lives - a.lives;
      }
      return b.victories - a.victories;
    });
