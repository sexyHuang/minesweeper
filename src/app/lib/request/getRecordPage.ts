import { LEVEL } from '../constants';

type User = {
  name: string | null;
  image: string | null;
  id: string;
  email: string;
  createdAt: Date;
};

type Record = {
  rank: number;
  time: number;
  level: LEVEL;
  user: User;
  userId: string;
};

export const getRecordPage = async ({
  current = 1,
  pageSize = 10,
  level
}: {
  current?: number;
  pageSize?: number;
  level: LEVEL;
}) => {
  try {
    const res = await fetch(
      `/api/rank/records?current=${current}&pageSize=${pageSize}&level=${level}`
    );
    if (res.ok) {
      return (await res.json()) as {
        data: Record[];
        total: number;
      };
    }
    throw new Error('Network response was not ok');
  } catch (error) {
    throw error;
  }
};
