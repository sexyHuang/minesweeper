import { useEffect, useRef, useState } from "react";
import { MineBoard, MineBoardOptions } from ".";

export const useMineBoard = (options: MineBoardOptions) => {
  const boardRef = useRef(new MineBoard(options));
  const [checkCellIdxs, setCheckCellIdxs] = useState<number[]>([]);
  const [board, setBoard] = useState([...boardRef.current.board]);

  const withUpdate = (fn: (idx: number) => number[]) => {
    return (cell: number) => {
      const updatedCells = fn(cell);
      setBoard((board) => {
        return board.map((cell, i) => {
          if (updatedCells.some((idx) => idx === i)) {
            return {
              ...boardRef.current.board[i],
            };
          }
          return cell;
        });
      });
    };
  };

  const reset = (_options?: MineBoardOptions) => {
    boardRef.current.init(_options ?? options);
    setBoard([...boardRef.current.board]);
  };

  useEffect(() => {
    reset(options);
  }, [options]);

  return {
    boardRef,
    checkCellIdxs,
    reset() {
      reset();
    },
    check(idx: number) {
      const cell = boardRef.current.getCell(idx);
      if (!cell.opened) {
        setCheckCellIdxs([idx]);
      } else {
        const checkCellIdxs: number[] = [];
        boardRef.current.travelAround(idx, (cell, idx) => {
          if (cell.flagged || cell.opened) return;
          checkCellIdxs.push(idx);
        });
        setCheckCellIdxs(checkCellIdxs);
      }
    },
    unCheck() {
      setCheckCellIdxs([]);
    },
    board,
    openCell: withUpdate(boardRef.current.openCell.bind(boardRef.current)),
    toggleFlag: withUpdate(boardRef.current.toggleFlag.bind(boardRef.current)),
    openAround: withUpdate(boardRef.current.openAround.bind(boardRef.current)),
  };
};
