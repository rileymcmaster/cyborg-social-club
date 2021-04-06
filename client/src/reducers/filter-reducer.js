const initialState = {};

export default function filterReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_FILTER": {
      return {
        ...state,
        [action.filter.name]: { ...action.filter },
      };
    }
    case "REMOVE_FILTER": {
      const stateCopy = { ...state };
      delete stateCopy[action.filter.name];
      return stateCopy;
    }
    case "SINGLE_FILTER": {
      return {
        [action.filter.name]: { ...action.filter },
      };
    }
    default:
      return state;
  }
}
