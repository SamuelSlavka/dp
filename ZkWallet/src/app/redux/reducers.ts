import {
  GET_ETH_ZKINPUT,
  GET_ETH_BALANCE,
  NEW_ETH_ACCOUNT,
  LOAD_ETH_ACCOUNT,
  GET_ETH_ADDRESS,
} from './actions';

const initialState = {
  input: '' as string,
  ethBalance: '' as string,
  keyfile: '' as string,
  ethAddress: '' as string,
};

function ethereumReducer(state = initialState, action: any) {
  switch (action.type) {
    case GET_ETH_ZKINPUT:
      return {...state, input: action.payload};
    case GET_ETH_BALANCE:
      return {...state, ethBalance: action.payload};
    case NEW_ETH_ACCOUNT:
      return {...state, keyfile: action.payload};
    case LOAD_ETH_ACCOUNT:
      if (action.payload === 'account already exists') {
        return {...state};
      }
      return {...state, keyfile: action.payload};
    case GET_ETH_ADDRESS:
      return {...state, ethAddress: action.payload};
    default:
      return state;
  }
}

export default ethereumReducer;