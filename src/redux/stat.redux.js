import { rolling } from "../util/mac-api";
import moment from "moment";
import { getConfig, getStat, saveStat } from "../util/configUtil";

let staticData = getStat();
let config = getConfig();

const AUTO_ADD_STAT_EVENT = "AUTO_ADD_STAT_EVENT";

export function stat(state, action) {
  switch (action.type) {
    case AUTO_ADD_STAT_EVENT: {
      if (state.length > 0) {
        let lastSlice = state[state.length - 1];
        if (action.payload.name === lastSlice.name) {
          //如果在同一个小时内,则加在一起，因为最小统计周期为一小时
          if (
            moment(lastSlice.start).format("YYYYMMDDhh") ===
            moment().format("YYYYMMDDh")
          ) {
            state[state.length - 1].duration += config.intervalSec;
            return state;
          }
        }
      }

      const s = [...state, action.payload];
      saveStat(JSON.stringify(s));
      return s;
    }
    default:
      return staticData || [];
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
