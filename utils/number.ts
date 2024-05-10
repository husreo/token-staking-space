export const generateRandomNumber = () => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * timestamp);
  return random;
};
