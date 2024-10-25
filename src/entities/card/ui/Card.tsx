import { CardProps } from '@/entities/card/model/types';

export const Card: React.FC<CardProps> = ({ word, type, revealed, onClick }) => {
  const baseClasses = "p-2 rounded-lg text-center cursor-pointer transition-colors h-24 flex items-center justify-center";
  const colorClasses = revealed
    ? type === 'red' ? 'bg-red-500 text-white'
    : type === 'blue' ? 'bg-blue-500 text-white'
    : type === 'assassin' ? 'bg-black text-white'
    : 'bg-gray-300 text-black'
    : 'bg-yellow-100 hover:bg-yellow-200 border-2 border-gray-300';

  return (
    <div className={`${baseClasses} ${colorClasses}`} onClick={onClick}>
      <span className="font-bold text-sm uppercase break-words">{word}</span>
    </div>
  );
};
