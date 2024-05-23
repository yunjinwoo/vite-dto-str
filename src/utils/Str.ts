function toPascalCase(
  input: string,
  separatorSplit: string = " ",
  separatorJoin: string = " "
) {
  return input
    .split(separatorSplit)
    .map((word: string) => {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(separatorJoin);
}

export const Str = {
  toPascalCase,
};
