export function getMonthdays(
  year = new Date().getYear(),
  month = new Date().getMonth() + 1
) {
  return new Date(year, month, 0).getDate();
}
