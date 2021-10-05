import * as actionTypes from "../actionTypes";

export function breadCrumbUpdated(path) {
  return { type: actionTypes.BREADCRUMB_PATH_CHANGED, path: path };
}

export function updateBreadcrumbPath(path) {
  return function (dispatch) {
    dispatch(breadCrumbUpdated(path));
  };
}
