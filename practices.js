let dt = 1719502508;
const curDate = new Date(dt * 1000);
// console.log(curDate);

const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
};

const formatter = new Intl.DateTimeFormat("en-US", options);
const date = formatter.format(curDate);
console.log(date);
