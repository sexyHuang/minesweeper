import { CellImage } from './CellImage';
import { useMemo } from 'react';
type BaseCell = {
  opened: boolean;
  flagged: boolean;
  mined: boolean;
  safe?: boolean;
  minedCount: number;
};

type CellProps = {
  cell: BaseCell;
  onOpen: (cell: BaseCell) => void;
  onCheck: (cell: BaseCell) => void;
  onUnCheck: (cell: BaseCell) => void;
  clicking?: boolean;
  onToggleFlag: (cell: BaseCell) => void;
};

enum ClickingButton {
  NONE,
  LEFT,
  RIGHT = 2
}

const Cell: React.FC<CellProps> = ({
  cell,
  onOpen,
  onCheck,
  onUnCheck,
  clicking,
  onToggleFlag
}) => {
  const type = useMemo(() => {
    if (cell.flagged) return 'flag';
    if (!cell.opened) {
      if (clicking) return 0;
      return 'closed';
    }
    if (cell.mined) return cell.safe ? 'mine' : 'mine_red';
    return cell.minedCount;
  }, [cell, clicking]);

  const onMouseDownRight = (e: React.MouseEvent) => {
    onToggleFlag(cell);
  };
  const onMouseDownLeft = () => {
    onCheck(cell);
  };

  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    switch (e.buttons) {
      case ClickingButton.LEFT:
        onMouseDownLeft();
        break;
      case ClickingButton.RIGHT:
        onMouseDownRight(e);
        break;
    }
  };

  return (
    <div
      onMouseDown={onMouseDown}
      onMouseLeave={() => onUnCheck(cell)}
      onContextMenu={e => e.preventDefault()}
      onMouseUp={e => {
        if (e.button === 0) onOpen(cell);
        onUnCheck(cell);
      }}
      onMouseEnter={e => {
        if (e.buttons === ClickingButton.LEFT) onMouseDownLeft();
      }}
    >
      <CellImage type={type} />
    </div>
  );
};

export default Cell;
