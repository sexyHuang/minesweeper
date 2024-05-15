import { useMemo } from 'react';
import { Box } from './styled';
import { DigitCell } from './DigitCell';
import * as RATIO from './constants';

export type DigitPanelProps = {
  value?: number;
  style?: React.CSSProperties;
  className?: string;
  size?: number | string;
};

const MIN = -99;
const MAX = 999;
export const DigitPanel: React.FC<DigitPanelProps> = ({
  value,
  size = 56,
  ...props
}) => {
  const valStr = useMemo(() => {
    if (value === undefined) return '0'.padStart(3, '0');
    if (value < MIN) return `${MIN}`;
    if (value > MAX) return `${MAX}`;
    return `${value}`.padStart(3, '0');
  }, [value]);

  const _size = typeof size === 'number' ? `${size}px` : size;
  return (
    <Box size={_size} {...props}>
      {valStr.split('').map((v, i) => (
        <DigitCell
          key={i}
          value={v}
          size={`calc(${_size} * ${RATIO.RATIO_CELL_TO_BOX})`}
        />
      ))}
    </Box>
  );
};
