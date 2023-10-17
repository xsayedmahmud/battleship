const humanPlayer = () => {
  const attackHuman = (gameboard, coordinates) => {
    gameboard.receiveAttack(coordinates);
  };

  return {
    attackHuman,
  };
};

export default humanPlayer;
