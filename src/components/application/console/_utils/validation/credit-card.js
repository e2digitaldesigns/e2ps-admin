export default (number) => {
  const regExMatch = /[0-9]/g;
  const match = number.match(regExMatch);
  const length = match ? match.length : 0;
  let num = '';

  if (length > 0) {
    for (let i = 0; i < length; i++) {
      if (i % 4 === 0 && i !== 0) {
        num = num + ' ';
      }
      num = num + match[i];
    }
  }

  return num.substring(0, 19);
};
