export type CardType = 'red' | 'blue' | 'neutral' | 'assassin';

export interface Card {
  word: string;
  type: CardType;
  revealed: boolean;
}

export interface CardProps extends Card {
  onClick: () => void;
}
