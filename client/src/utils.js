export const dateFormater = (date) => {
  const timestamp = date;
  const dateObj = new Date(timestamp);
  const formattedDate = dateObj.toLocaleDateString("en-GB").replace(/\//g, "-");

  return formattedDate;
};
