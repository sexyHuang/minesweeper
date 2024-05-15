import { useMemo } from 'react';
import { CellImage } from './styled';

type DigitCellProps = {
  value: string;
  size?: string;
};

export const DigitCell: React.FC<DigitCellProps> = ({
  value,
  size = '15px'
}) => {
  const src = useMemo(() => {
    const prefix = `/digit/`;
    if (/^[\d-]$/.test(value)) return `${prefix}d${value}.svg`;
    return `${prefix}d0.svg`;
  }, [value]);
  return (
    <CellImage src={src} size={size} alt={`${value}`} width={15} height={28} />
  );
};
