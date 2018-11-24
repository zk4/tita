import store from "./store";
import { rolling } from "../util/mac-api";
import { getConfig, saveStat } from "../util/configUtil";

let config = getConfig();

const AUTO_ADD_STAT_EVENT = "AUTO_ADD_STAT_EVENT";

export function stat(state = null, action) {
  switch (action.type) {
    case AUTO_ADD_STAT_EVENT: {
      // if (state.length > 0) {
      //   let lastSlice = state[state.length - 1];
      //   if (action.payload.name === lastSlice.name) {
      //     //如果在同一个小时内,则加在一起，因为最小统计周期为一小时
      //     if (
      //       moment(lastSlice.start).format("YYYYMMDDhh") ===
      //       moment().format("YYYYMMDDh")
      //     ) {
      //       state[state.length - 1].duration += config.intervalSec;
      //       return state;
      //     }
      //   }
      // }

      const s = action.payload;
      saveStat(s);
      return s;
    }
    default:
      return state;
  }
}
setInterval(() => {
 
  store.dispatch(async (dispatch, state) => {
 
    if (!state().mouse) {
      let payload = await rolling();
      dispatch({
        type: AUTO_ADD_STAT_EVENT,
        payload
      });
    }
  });
}, config.intervalSec * 1000);

// export function autoAddStatEvent(payload) {
//   return dispatch => {
//     (async () => {
//       setInterval(async () => {

//         let payload = await rolling();
//         dispatch({ type: AUTO_ADD_STAT_EVENT, payload });
//       }, config.intervalSec * 1000);
//     })();
//   };
// }
