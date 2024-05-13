export function formatDateDDMMYYYY(date: any) {
  if (!date || date === "") return "No data";
  const curDate = new Date(date);
  const day =
    curDate.getDate() < 10 ? `0${curDate.getDate()}` : curDate.getDate();
  const month =
    curDate.getMonth() + 1 < 10
      ? `0${curDate.getMonth() + 1}`
      : curDate.getMonth() + 1;
  return `${day}/${month}/${curDate.getFullYear()}`;
}
