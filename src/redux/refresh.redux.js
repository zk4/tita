const SWITCH_REFRESH = "SWITCH_REFRESH";
const CLOSE_REFRESH = "CLOSE_REFRESH";

export function refresh(state = false, action) {
  switch (action.type) {
    case SWITCH_REFRESH: {
      return !state;
    }
    case CLOSE_REFRESH: {
      console.log("CLOSE_REFRESH");
      return false;
    }
    default:
      return state;
  }
}
export function switchRefresh(arg) {
  return { type: SWITCH_REFRESH };
}

export function closeRefresh(arg) {
  return { type: CLOSE_REFRESH,payload:false };
}