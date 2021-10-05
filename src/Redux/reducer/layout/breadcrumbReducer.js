import * as actionTypes from "../../actionTypes";
import initialState from "../../initialState";

export default function breadCrumbReducer(state = initialState.path, action) {
  switch (action.type) {
    case actionTypes.BREADCRUMB_PATH_CHANGED:
      return action.path;
    default:
      return state;
  }
}
