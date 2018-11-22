import { rolling } from "../util/mac-api";
import moment from "moment";
import { notification } from "antd";
import { config } from "../config";
const storage = window.require("electron-json-storage");

const defaultDataPath = storage.getDefaultDataPath();
console.log("defaultDataPath", defaultDataPath);

const AUTO_ADD_STAT_EVENT = "AUTO_ADD_STAT_EVENT";

export function stat(state, action) {
  switch (action.type) {
    case AUTO_ADD_STAT_EVENT: {
      if (state.length > 0) {
        let lastSlice = state[state.length - 1];
        if (action.payload.name === lastSlice.name) {
          //todo 如果在同一个小时内,则加在一起，因为最小统计周期为一小时
          if (
            moment(lastSlice.start).format("YYYYMMDDhh") ===
            moment().format("YYYYMMDDh")
          ) {
            state[state.length - 1].duration += config.intervalSec;
            return state;
          }
        }
      }

      return [...state, action.payload];
    }
    default:
      return [];
  }
}

 

export function autoAddStatEvent(payload) {
  return dispatch => {
    (async () => {
      setInterval(async () => {
        let payload = await rolling();
        dispatch({ type: AUTO_ADD_STAT_EVENT, payload });
      }, config.intervalSec * 1000);
    })();
  };
}
