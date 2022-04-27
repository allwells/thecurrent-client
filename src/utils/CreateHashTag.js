export default function createHashTag(tag) {
  // Split sentence into an array of strings
  const splitedTag = tag.split(" ");

  // Loop through the array,
  // set the first letter of each word to uppercase
  const upperCasedTag = splitedTag.map(
    (element) => element.charAt(0).toUpperCase() + element.substr(1)
  );

  // Join each element of the array together
  const createdHashTag = upperCasedTag.join("");

  return createdHashTag;
}
