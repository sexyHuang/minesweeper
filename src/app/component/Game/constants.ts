import { LEVEL as LEVEL_ENUM } from '@/app/lib/constants';

export const LEVEL = {
  [LEVEL_ENUM.EASY]: {
    rows: 9,
    cols: 9,
    mines: 10
  },
  [LEVEL_ENUM.MEDIUM]: {
    rows: 16,
    cols: 16,
    mines: 40
  },
  [LEVEL_ENUM.HARD]: {
    rows: 16,
    cols: 30,
    mines: 99
  }
};

export const LEVEL_NAME = {
  [LEVEL_ENUM.EASY]: '初级',
  [LEVEL_ENUM.MEDIUM]: '中级',
  [LEVEL_ENUM.HARD]: '高级'
};
