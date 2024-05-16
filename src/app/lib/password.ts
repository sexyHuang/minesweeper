import { SHA256 } from 'crypto-js';

export const hashPassword = (password: string): string => {
  return SHA256(password).toString();
};

export const comparePassword = (password: string, hash: string): boolean => {
  return hashPassword(password) === hash;
};
