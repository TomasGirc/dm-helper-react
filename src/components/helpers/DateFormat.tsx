export const dateFormat = (date: string) => {
  const val = new Date(date);
  return val.toDateString();
};
