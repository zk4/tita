const SWITCH_REFRESH = "SWITCH_REFRESH";

export function refresh(state = false, action) {
  switch (action.type) {
    case SWITCH_REFRESH: {
      return !state;
    }
    default:
      return state;
  }
}
export function switchRefresh(arg) {
  return { type: SWITCH_REFRESH };
}
