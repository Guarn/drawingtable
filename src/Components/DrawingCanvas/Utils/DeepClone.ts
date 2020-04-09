/**
 * Performs a full clone of an object. Usefull to create a real copy of a Class instance.
 */
export const deepClone = <T>(v: T): T =>
  Object.assign(Object.create(Object.getPrototypeOf(v)), v);
