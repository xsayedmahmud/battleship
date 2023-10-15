const Ship = (length, name) => {
  let hits = 0;

  const hit = () => {
    if (hits <= length) {
      hits++;
    }
  };

  const getHits = () => hits;
  const isSunk = () => hits >= length;

  return {
    length,
    getHits,
    hit,
    isSunk,
    name,
  };
};

export default Ship;
