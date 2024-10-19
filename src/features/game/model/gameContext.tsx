'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';
import { GameState } from './types';
import { Card, CardType } from '@/entities/card/model/types';

interface GameContextType {
  gameState: GameState;
  endTurn: () => void;
  revealCard: (index: number) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [gameState, setGameState] = useState<GameState>({
    cards: Array(25).fill(null).map((_, i): Card => ({
      word: `Word ${i + 1}`,
      type: (['red', 'blue', 'neutral', 'assassin'][i % 4]) as CardType,
      revealed: false,
    })),
    currentTeam: 'red',
    redScore: 0,
    blueScore: 0,
  });

  const endTurn = () => {
    setGameState(prevState => ({
      ...prevState,
      currentTeam: prevState.currentTeam === 'red' ? 'blue' : 'red',
    }));
  };

  const revealCard = (index: number) => {
    setGameState(prevState => {
      const newCards = [...prevState.cards];
      newCards[index] = { ...newCards[index], revealed: true };

      let newRedScore = prevState.redScore;
      let newBlueScore = prevState.blueScore;

      if (newCards[index].type === 'red') newRedScore++;
      if (newCards[index].type === 'blue') newBlueScore++;

      return {
        ...prevState,
        cards: newCards,
        redScore: newRedScore,
        blueScore: newBlueScore,
      };
    });
  };

  return (
    <GameContext.Provider value={{ gameState, endTurn, revealCard }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGameState = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGameState must be used within a GameProvider');
  }
  return context;
};
