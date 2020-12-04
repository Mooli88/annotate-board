import {createStore} from 'react-hookstore';
import {AnotationActionTypes, IAnnotaion} from './types';

const AnnotationsReducer = (state: IAnnotaion[] = [], action: AnotationActionTypes) => {
  switch (action.type) {
    case 'ADD':
      return [...state, {...action.payload}];
    case 'REMOVE': {
      // return state.filter(({id}) => id !== action.payload.id);
      const index = state.findIndex(({id}) => id === action.payload.id);
      //TODO: throw error if index === -1
      return index >= 0 ? [...state].splice(index, 1) : state;
    }
    case 'UPDATE': {
      const index = state.findIndex(({id}) => id === action.payload.id);
      //TODO: throw error
      if (index < 0) return state;

      const annotation = {...state[index], note: action.payload.note};
      state[index] = annotation;

      return state;
    }
    case 'RESET': {
      return action.payload;
    }
    default:
      return state;
  }
};

const initStore = (initVals: IAnnotaion[] = []) => {
  createStore<IAnnotaion[]>('annotations', initVals, AnnotationsReducer);
};

export default initStore;
