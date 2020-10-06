export default (number, max) => {
  const regExMatch = /[0-9]/g;
  const match = number.match(regExMatch);
  let num = match ? match.toString().replace(/,/g, '') : '';
  return num.substring(0, max);
};
