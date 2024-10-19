import { CardProps } from '@/entities/card/model/types';

export const Card: React.FC<CardProps> = ({ word, type, revealed, onClick }) => {
  const baseClasses = "p-4 rounded-lg text-center cursor-pointer transition-colors";
  const colorClasses = revealed
    ? type === 'red' ? 'bg-red-500 text-white'
    : type === 'blue' ? 'bg-blue-500 text-white'
    : type === 'assassin' ? 'bg-black text-white'
    : 'bg-gray-300 text-black'
    : 'bg-yellow-100 hover:bg-yellow-200';

  return (
    <div className={`${baseClasses} ${colorClasses}`} onClick={onClick}>
      {word}
    </div>
  );
};
