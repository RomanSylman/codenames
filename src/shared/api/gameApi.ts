import { GameState } from '@/features/game/model/types';

export const fetchGameState = async (): Promise<GameState> => {
  return {
    cards: [], 
    currentTeam: 'red',
    redScore: 0,
    blueScore: 0,
  };
};
