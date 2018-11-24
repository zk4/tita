import store from "./store";

const { ipcRenderer } = window.require("electron");
const WINDOW_EVENT = "WINDOW_EVENT";

export function windowEvent(state = null, action) {
  switch (action.type) {
    case WINDOW_EVENT: {
      return action.payload;
    }
    default:
      return state;
  }
}

ipcRenderer.on("ipc", (evt, msg) => {
  store.dispatch({ type: WINDOW_EVENT, payload: msg });
  store.dispatch({ type: WINDOW_EVENT, payload: null });
});
