'use client';

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { GameState } from './types';
import { Card, CardType } from '@/entities/card/model/types';
import { supabase } from '@/lib/supabaseClient';
import { wordList } from '@/data/wordList';

interface GameContextType {
  gameState: GameState;
  endTurn: () => void;
  revealCard: (index: number) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);
export const GameProvider: React.FC<{ children: ReactNode; roomId: string }> = ({ children, roomId }) => {
  const [gameState, setGameState] = useState<GameState | null>(null);

  useEffect(() => {
    const fetchGameState = async () => {
      const response = await fetch('/api/game', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roomId, action: 'get' }),
      });
      const data = await response.json();
      if (data.gameState) {
        setGameState(data.gameState);
      } else {
        // Initialize new game state
        const getRandomWords = (count: number) => {
          const shuffled = [...wordList].sort(() => 0.5 - Math.random());
          return shuffled.slice(0, count);
        };

        const newGameState: GameState = {
          cards: getRandomWords(25).map((word, i): Card => ({
            word,
            type: (['red', 'blue', 'neutral', 'assassin'][i % 4]) as CardType,
            revealed: false,
          })),
          currentTeam: 'red',
          redScore: 0,
          blueScore: 0,
        };
        await fetch('/api/game', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ roomId, action: 'create', data: newGameState }),
        });
        setGameState(newGameState);
      }
    };

    fetchGameState();

    // Set up real-time subscription
    const subscription = supabase
      .channel(`game_${roomId}`)
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'games', filter: `room_id=eq.${roomId}` }, (payload) => {
        setGameState(payload.new.game_state);
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [roomId]);

  const updateGameState = async (newState: GameState) => {
    setGameState(newState);
    await fetch('/api/game', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ roomId, action: 'update', data: newState }),
    });
  };

  const endTurn = () => {
    if (gameState) {
      const newState: GameState = {
        ...gameState,
        currentTeam: gameState.currentTeam === 'red' ? 'blue' : 'red',
      };
      updateGameState(newState);
    }
  };

  const revealCard = (index: number) => {
    if (gameState) {
      const newCards = [...gameState.cards];
      newCards[index] = { ...newCards[index], revealed: true };

      let newRedScore = gameState.redScore;
      let newBlueScore = gameState.blueScore;

      if (newCards[index].type === 'red') newRedScore++;
      if (newCards[index].type === 'blue') newBlueScore++;

      const newState = {
        ...gameState,
        cards: newCards,
        redScore: newRedScore,
        blueScore: newBlueScore,
      };
      updateGameState(newState);
    }
  };

  if (!gameState) {
    return <div>Loading...</div>;
  }

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
