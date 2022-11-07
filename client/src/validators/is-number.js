export const isNumber = (rating) => {
  const re = /^-?\d+\.?\d*$/;

  return re.test(rating);
};
