'use client';

import { Card } from '@/entities/card/ui/Card';
import { useGameState } from '@/features/game/model/gameContext';

export const GameBoard: React.FC = () => {
  const { gameState, revealCard } = useGameState();

  return (
    <div className="grid grid-cols-5 gap-4">
      {gameState.cards.map((card, index) => (
        <Card 
          key={index} 
          {...card} 
          onClick={() => revealCard(index)}
        />
      ))}
    </div>
  );
};
