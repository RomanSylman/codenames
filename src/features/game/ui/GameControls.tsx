'use client';

import { Button } from '@/shared/ui/Button';
import { useGameState } from '@/features/game/model/gameContext';

export const GameControls: React.FC = () => {
  const { gameState, endTurn } = useGameState();

  return (
    <div className="mt-8 flex justify-center">
      <Button onClick={endTurn}>End {gameState.currentTeam}&apos;s Turn</Button>
    </div>
  );
};
