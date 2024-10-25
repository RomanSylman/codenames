'use client';

import { useGameState } from '@/features/game/model/gameContext';

interface TeamInfoProps {
  team: 'red' | 'blue';
}

export const TeamInfo: React.FC<TeamInfoProps> = ({ team }) => {
  const { gameState } = useGameState();
  const score = team === 'red' ? gameState.redScore : gameState.blueScore;
  const bgColor = team === 'red' ? 'bg-red-700' : 'bg-blue-700';

  return (
    <div className={`${bgColor} p-4 rounded-lg text-white`}>
      <h2 className="text-xl font-bold">{team.charAt(0).toUpperCase() + team.slice(1)} Team</h2>
      <p>Score: {score}</p>
      <button className="mt-2 bg-yellow-400 text-black px-2 py-1 rounded">Join as Operative</button>
      <button className="mt-2 ml-2 bg-yellow-400 text-black px-2 py-1 rounded">Join as Spymaster</button>
    </div>
  );
};
