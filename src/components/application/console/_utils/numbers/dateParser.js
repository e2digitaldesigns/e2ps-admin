export default (data, display = "sm", time = false) => {
  let options;

  switch (display) {
    case "xs":
      options = {
        month: "numeric",
        day: "numeric",
        year: "numeric",
      };
      break;

    default:
    case "sm":
      options = {
        weekday: "short",
        month: "numeric",
        day: "numeric",
        year: "numeric",
      };
      break;

    case "md":
      options = {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      };
      break;

    case "lg":
      options = {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      };
      break;
  }

  if (time === true) {
    options.hour = "numeric";
    options.minute = "numeric";
  }

  const theDate = new Date(data);
  const date = theDate.toLocaleDateString("en-US", options);
  return date;
};
