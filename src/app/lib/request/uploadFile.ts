import { type PutBlobResult } from '@vercel/blob';

export const uploadFile = (file: File) => {
  return fetch(`/api/upload?filename=${file.name}`, {
    method: 'POST',
    body: file
  }).then(async res => {
    if (!res.ok) {
      throw new Error(await res.json());
    }
    return res.json() as Promise<PutBlobResult>;
  });
};
