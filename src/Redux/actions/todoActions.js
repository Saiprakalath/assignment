import * as actionTypes from "../actionTypes";
import * as api from "../../api/todoApi";

export function getTaskSuccesss(data){
    return {type:actionTypes.GET_LIST, data}
}


export function updateTaskSuccesss(data){
    return {type:actionTypes.UPDATE_LIST, data}
}

export function createTaskSuccesss(data){
    return {type:actionTypes.CREATE_LIST, data}
}

export function getTasks() {
    return function (dispatch) {
      return api
        .getTasks()
        .then((data) => {
          dispatch(getTaskSuccesss(data));
          return data;
        })
        .catch((error) => {
          throw error;
        });
    };
  }

  export function updateTask(id,data) {
    return function (dispatch) {
      return api
        .updateTask(id,data)
        .then((data) => {
          dispatch(updateTaskSuccesss(data));
          return data;
        })
        .catch((error) => {
          throw error;
        });
    };
  }

  export function createTask(data) {
    return function (dispatch) {
      return api
        .createTask(data)
        .then((data) => {
          dispatch(createTaskSuccesss(data));
          return data;
        })
        .catch((error) => {
          throw error;
        });
    };
  }