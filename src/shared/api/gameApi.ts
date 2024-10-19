import { GameState } from '@/features/game/model/types';

export const fetchGameState = async (): Promise<GameState> => {
  // In a real app, this would be an API call
  return {
    cards: [], // Populate with actual card data
    currentTeam: 'red',
    redScore: 0,
    blueScore: 0,
  };
};
