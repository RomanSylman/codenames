'use client';

import { JoinRoom } from '@/features/room/ui/JoinRoom';
import { GameProvider } from '@/features/game/model/gameContext';
import { useParams } from 'next/navigation';

export default function RoomPage() {
  const params = useParams();
  const roomId = params.roomId as string;

  return (
    <GameProvider roomId={roomId}>
      <JoinRoom roomId={roomId} nickname="" setNickname={() => {}} />
    </GameProvider>
  );
}
