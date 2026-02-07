export const capitalizeWord = (word: string) => {
  const separate = word.toLowerCase().slice(1);
  const capitalizedLetter = word[0].toUpperCase();
  return capitalizedLetter + separate;
};
