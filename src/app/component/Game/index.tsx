'use client';
import { LEVEL } from './constants';
import { GameBox, Header } from './styled';

import { useRef, useState } from 'react';
import Board, { BoardRef } from './../Board';
import { Timer, TimerRef } from './../Timer';
import { GameStatus } from '@/app/lib/MineBoard/constants';
import { DigitPanel } from '../DigitPanel';
import { FaceButton } from '../FaceButton';
export type GameProps = {
  level: keyof typeof LEVEL;
};

export const Game = ({ level }: GameProps) => {
  const [flags, setFlags] = useState(0);
  const [gameStatus, setGameStatus] = useState(GameStatus.UN_STARTED);

  const mineBoardRef = useRef<BoardRef>(null);
  const timerRef = useRef<TimerRef>(null);
  const levelObj = LEVEL[level];
  return (
    <GameBox>
      <Header>
        <DigitPanel value={levelObj.mines - flags} />
        <FaceButton
          status={gameStatus}
          onClick={() => {
            mineBoardRef.current?.reset();
          }}
        />
        <Timer interval={1000} ref={timerRef} />
      </Header>
      <Board
        {...levelObj}
        onToggleFlag={setFlags}
        onGameStatusChange={status => {
          setGameStatus(status);
          switch (status) {
            case GameStatus.PLAYING:
              timerRef.current?.start();
              break;
            case GameStatus.WIN:
            case GameStatus.LOSE:
              const time = timerRef.current?.stop();
              console.log(time);
              break;
            default:
              timerRef.current?.reset();
          }
        }}
        ref={mineBoardRef}
      />
    </GameBox>
  );
};
