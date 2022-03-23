const Purify = (text) => {
  text = text.replaceAll("-", " ").toLowerCase();
  return text;
};

export default Purify;
