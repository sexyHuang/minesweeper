'use client';

import { useState } from 'react';
import { LEVEL } from './component/Game/constants';
import { Game } from './component/Game';
import { LevelButtonGroup } from './component/LevelButtonGroup';

export default function Home() {
  const [currentLevel, setCurrentLevel] = useState<keyof typeof LEVEL>('easy');
  return (
    <>
      <LevelButtonGroup value={currentLevel} onChange={setCurrentLevel} />
      <Game level={currentLevel} />
    </>
  );
}
