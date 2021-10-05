import axios from "axios";

export function getTasks() {
  return axios.get("https://615c7006c2981300177361b9.mockapi.io/task");
}


export function createTask(data) {
  return axios.post(
    "https://615c7006c2981300177361b9.mockapi.io/task",
    data
  );
}

export function updateTask(id, data) {
  return axios.put(
    `https://615c7006c2981300177361b9.mockapi.io/task/${id}`,
    data
  );
}

export function deleteTask(id) {
  return axios.delete(
    `https://615c7006c2981300177361b9.mockapi.io/task/${id}`
  );
}