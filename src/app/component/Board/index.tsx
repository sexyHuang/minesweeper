"use client";

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";
import { BoardBase } from "./styled";
import Cell from "../Cell";
import { useMineBoard } from "@/app/lib/MineBoard/useMineboard";
import { GameStatus } from "@/app/lib/MineBoard/constants";
import { MineBoard, MineBoardOptions } from "@/app/lib/MineBoard";

type BoardProps = {
  rows: number;
  cols: number;
  mines: number;
  onToggleFlag?: (flags: number) => void;
  onGameStatusChange?: (status: GameStatus) => void;
};

export type BoardRef = {
  instance: MineBoard;
  reset: (options?: MineBoardOptions) => void;
};

const Board = forwardRef<BoardRef, BoardProps>(
  ({ rows, cols, mines, onToggleFlag, onGameStatusChange }, ref) => {
    const options = useMemo(() => {
      return { rows, cols, mines };
    }, [rows, cols, mines]);
    const {
      boardRef,
      reset,
      board,
      openCell,
      toggleFlag,
      openAround,
      check,
      unCheck,
      checkCellIdxs,
    } = useMineBoard(options);
    useImperativeHandle(ref, () => ({
      instance: boardRef.current,
      reset,
    }));
    useEffect(() => {
      const offList = [
        onToggleFlag && boardRef.current.onFlaggedChange(onToggleFlag),
        onGameStatusChange &&
          boardRef.current.onGameStatusChange(onGameStatusChange),
      ];
      return () => {
        offList.forEach((off) => off?.());
      };
    }, []);
    return (
      <BoardBase columns={cols}>
        {board.map((cell, i) => {
          return (
            <Cell
              key={`${i}`}
              cell={cell}
              clicking={checkCellIdxs.includes(i)}
              onOpen={(cell) => {
                if (cell.opened) openAround(i);
                else openCell(i);
              }}
              onCheck={() => {
                check(i);
              }}
              onUnCheck={() => {
                unCheck();
              }}
              onToggleFlag={() => {
                toggleFlag(i);
              }}
            />
          );
        })}
      </BoardBase>
    );
  }
);

export default Board;
