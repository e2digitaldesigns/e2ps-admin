export default (string, extras = false) => {
  const regExMatch = extras ? /^[a-zA-Z\d\-_.\s]+$/g : /^[a-zA-Z\d\s]+$/g;
  console.log(3, string, extras);
  if (!regExMatch.test(string) && string !== '') string = null;
  return string;
};
