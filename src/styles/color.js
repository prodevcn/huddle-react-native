import hex2rgba from 'hex-rgba';
import palette from './palette';

/**
 * @typedef {keyof palette} Palette
 * @param {Palette} name
 * @param {number} [opacity]
 */
const withOpacity = (name, opacity = 1) => (
  hex2rgba(palette[name], opacity * 100)
);

export default {
  withOpacity,
};
