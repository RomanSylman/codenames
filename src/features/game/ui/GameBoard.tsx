'use client';

import { Card } from '@/entities/card/ui/Card';
import { useGameState } from '@/features/game/model/gameContext';

export const GameBoard: React.FC = () => {
  const { gameState, revealCard } = useGameState();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-orange-900 p-4">
      <h1 className="text-4xl font-bold text-white mb-8">CodeNames Game</h1>
      <div className="grid grid-cols-5 gap-4 max-w-4xl mx-auto">
        {gameState.cards.map((card, index) => (
          <Card 
            key={index} 
            {...card} 
            onClick={() => revealCard(index)}
          />
        ))}
      </div>
    </div>
  );
};
