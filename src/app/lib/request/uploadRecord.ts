import { LEVEL } from '../constants';

export const upLoadRecord = async (record: { level: LEVEL; time: number }) => {
  try {
    const res = await fetch('/api/rank/records', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(record)
    });
    if (res.ok) {
      return await res.json();
    }
    throw new Error('Network response was not ok');
  } catch (error) {
    throw error;
  }
};
