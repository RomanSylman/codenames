import { Card as CardEntity } from '@/entities/card/model/types';

export interface GameState {
  cards: CardEntity[];
  currentTeam: 'red' | 'blue';
  redScore: number;
  blueScore: number;
}

export interface Card {
  word: string;
  type: 'red' | 'blue' | 'neutral' | 'assassin';
  revealed: boolean;
}
