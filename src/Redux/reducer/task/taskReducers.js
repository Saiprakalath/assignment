import * as actionTypes from "../../actionTypes";
import initialState from "../../initialState";

export default function taskReducer(state = initialState.tasks, action) {
  switch (action.type) {
    case actionTypes.GET_LIST:
      return { ...state, tasks: action.data["data"]};
    default:
      return state;
  }
}