export default (number) => {
  const regExMatch = /[0-9]|[.]/g;
  const match = number.match(regExMatch);
  if (!match) return '';

  const index = match.indexOf('.');

  let dollars = index > -1 ? match.slice(0, index) : match;
  dollars = dollars.toString().replace(/,/g, '');
  if (Number.isInteger(dollars)) dollars = parseInt(dollars);

  let cent = index > -1 ? match.slice(index).filter((f, i) => f !== '.') : null;
  cent = cent ? '.' + cent.toString().replace(/,/g, '').substring(0, 2) : '';

  let num = dollars + cent;

  return num;
};
