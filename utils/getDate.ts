export const getDate = (ts: number, time: boolean = false) => {
  const date = new Date(ts);
  let dateStr = `${date.getFullYear()}/${
    date.getMonth() + 1
  }/${date.getDate()}`;
  if (time) {
    const hour = date.getHours();
    const minute = date.getMinutes();
    dateStr += `   ${hour >= 10 ? hour : "0" + hour}:${
      minute >= 10 ? minute : "0" + minute
    }`;
  }
  return dateStr;
};
