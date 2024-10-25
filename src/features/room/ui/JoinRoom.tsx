'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/shared/ui/Button';
import { GameBoard } from '@/features/game/ui/GameBoard';

interface JoinRoomProps {
  roomId: string;
  nickname: string;
  setNickname: (nickname: string) => void;
}

export const JoinRoom: React.FC<JoinRoomProps> = ({ roomId, nickname, setNickname }) => {
  const [joined, setJoined] = useState(false);
  const [inputNickname, setInputNickname] = useState(nickname);

  useEffect(() => {
    if (nickname) {
      setJoined(true);
    }
  }, [nickname]);

  const handleJoinRoom = () => {
    if (inputNickname.trim()) {
      setNickname(inputNickname);
      setJoined(true);
    }
  };

  if (joined) {
    return <GameBoard />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-orange-900">
      <h1 className="text-4xl font-bold text-white mb-8">Join Room: {roomId}</h1>
      <input
        type="text"
        placeholder="Enter your nickname"
        value={inputNickname}
        onChange={(e) => setInputNickname(e.target.value)}
        className="mb-4 p-2 rounded"
      />
      <Button onClick={handleJoinRoom}>Join Room</Button>
    </div>
  );
};
