import moment from "moment";
export function getMonthdays(
  year = new Date().getYear(),
  month = new Date().getMonth() + 1
) {
  return new Date(year, month, 0).getDate();
}

export function getCurrentWeekFromTo() {
  var weekOfday = moment().format("E"); //计算今天是这周第几天
  var last_monday = moment()
    .subtract(weekOfday + 7 - 1, "days")
    .format("YYYY/MM/DD")
    .valueOf(); //周一日期
  var last_sunday = moment()
    .subtract(weekOfday, "days")
    .format("YYYY/MM/DD")
    .valueOf(); //周日日期
  return [last_monday, last_sunday];
}
