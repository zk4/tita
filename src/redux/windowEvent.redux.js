import store from "./store";
import { closeRefresh, openRefresh } from "./refresh.redux";
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
  if (msg === "blur" || msg === "minimize") store.dispatch(closeRefresh());
  if (msg === "focus") {
    store.dispatch(openRefresh());
  }

  store.dispatch({ type: WINDOW_EVENT, payload: msg });
  store.dispatch({ type: WINDOW_EVENT, payload: null });
});
