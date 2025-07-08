import { Dict } from '../types/dict';

export const getFirstElement = <T>(obj?: Dict<T>): T | null => {
  if (!obj) return null;
  const key = Object.keys(obj)[0];
  return obj[key] ?? null;
};
