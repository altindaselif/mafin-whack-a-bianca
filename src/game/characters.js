export const CHARACTERS = {
  bianca: {
    sprite: "./images/bianca-half.webp",
    dizzy: "./images/bianca-half-dizzy.webp",
    spawnWeight: 30,
    hitSound: "bianca",
    onHit: (actions) => actions.scorePoint(),
  },
  fina: {
    sprite: "./images/fina-half-hat.webp",
    dizzy: "./images/fina-half-dizzy-hat.webp",
    spawnWeight: 30,
    hitSound: "fina",
    onHit: (actions) => actions.loseLife(),
  },
  peacock: {
    sprite: "./images/peacock-hat.webp",
    dizzy: "./images/peacock-dizzy-hat.webp",
    spawnWeight: 20,
    onHit: (actions) => actions.stealTime(),
  },
  cow: {
    sprite: "./images/sick-cow-half-hat.webp",
    dizzy: "./images/sick-cow-half-dizzy-hat.webp",
    spawnWeight: 20,
    onHit: (actions, windowId) => actions.flashbang(windowId),
  },
};
