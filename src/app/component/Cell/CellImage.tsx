import Image from 'next/image';
import { useMemo } from 'react';

type CellImageProps = {
  type: 'flag' | 'closed' | 'mine_red' | 'mine' | number;
};

export const CellImage: React.FC<CellImageProps> = ({ type }) => {
  const src = useMemo(() => {
    const prefix = `/cell/`;
    if (typeof type === 'number') return `${prefix}type${type}.svg`;
    return `${prefix}${type}.svg`;
  }, [type]);
  return <Image src={src} width={24} height={24} alt={`${type}`} priority />;
};
