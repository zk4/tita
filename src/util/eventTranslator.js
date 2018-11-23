/*
event {
    name,
    timeStamp,
    duration
}
*/
function getTypeByName(name) {}

function getGroupspanByTimestamp(timeStamp) {}
export function convertEventByGroupKey(event, groupKey) {
  return {
    groupKey,
    type: getTypeByName(event.name),
    duration: event.duration,
    groupSpan: getGroupspanByTimestamp(event.timeStamp)
  };
}

export function convertTopEventByGroupKey(event, groupKey) {
  return {
    groupKey,
    type: getTypeByName(event.name),
    duration: event.duration,
    name: event.name
  };
}

export function convertAllEventsByGroupKey(allEvent, groupKey) {
  return allEvent.map(event => convertEventByGroupKey(event, groupKey));
}
export function convertAllTopEventsByGroupKey(allEvent, groupKey) {
  return allEvent.map(event => convertTopEventByGroupKey(event, groupKey));
}
