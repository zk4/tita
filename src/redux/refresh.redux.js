const SWITCH_REFRESH = "SWITCH_REFRESH";
const CLOSE_REFRESH = "CLOSE_REFRESH";
const OPEN_REFRESH = "OPEN_REFRESH";

export function refresh(state = true, action) {
  switch (action.type) {
    case SWITCH_REFRESH: {
      return !state;
    }
    case CLOSE_REFRESH: {
      return false;
    }
    case OPEN_REFRESH: {
      return true;
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


export function openRefresh(arg) {
  return { type: OPEN_REFRESH,payload:true };
}