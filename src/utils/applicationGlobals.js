// console.log(dataSet.sort(compareObjValues("size")));
export const compareObjValues = (key, order = "asc") => {
  return function innerSort(a, b) {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      return 0;
    }

    const varA = typeof a[key] === "string" ? a[key].toUpperCase() : a[key];
    const varB = typeof b[key] === "string" ? b[key].toUpperCase() : b[key];

    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return order === "desc" ? comparison * -1 : comparison;
  };
};

export const dateParser = (data = null) => {
  let date = new Date();

  if (data) {
    date = new Date(data);
  }

  const dayMap = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthMap = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const dates = {
    medium:
      dayMap[date.getDay()] +
      ". " +
      monthMap[date.getMonth()] +
      " " +
      date.getDate() +
      ", " +
      date.getFullYear(),
    short: date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear(),
  };

  return dates;
};
