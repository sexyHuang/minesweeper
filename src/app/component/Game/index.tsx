'use client';
import { LEVEL } from './constants';
import { GameBox, Header } from './styled';

import { useRef, useState } from 'react';
import Board, { BoardRef } from './../Board';
import { Timer, TimerRef } from './../Timer';
import { GameStatus } from '@/app/lib/MineBoard/constants';
import { DigitPanel } from '../DigitPanel';
import { FaceButton } from '../FaceButton';
import { Modal } from 'antd';
import { upLoadRecord } from '@/app/lib/request/uploadRecord';
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
              const time = timerRef.current?.stop();
              upLoadRecord({ level, time: time! });
              Modal.confirm({
                title: '恭喜你，你赢了！',
                content: `用时${time! / 1000}秒`
              });
              break;
            case GameStatus.LOSE:
              timerRef.current?.stop();
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
