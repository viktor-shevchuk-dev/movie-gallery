export const convertMinsToHrsMins = (mins) =>
  `${Math.floor(mins / 60)}h ${mins % 60}min`;
