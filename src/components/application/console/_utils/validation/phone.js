export default (numberString) => {
  const number = numberString;
  const regExMatch = /[0-9]/g;
  const match = number.match(regExMatch);
  const length = match ? match.length : 0;
  let num = '';

  if (length > 0) {
    for (let i = 0; i < length; i++) {
      if (i === 3) num = `(${num}) `;
      if (i === 6) num = num + '-';
      num = num + match[i];
    }
  }

  num = num.trim().substring(0, 14);
  console.log(num);
  return num;
};
