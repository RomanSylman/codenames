'use client';

import { useState, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { CreateRoom } from '@/features/room/ui/CreateRoom';
import { JoinRoom } from '@/features/room/ui/JoinRoom';
import { GameProvider } from '@/features/game/model/gameContext';

export default function Home() {
  const [roomId, setRoomId] = useState<string | null>(null);
  const [nickname, setNickname] = useState<string>('');
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const roomIdFromUrl = searchParams.get('roomId');
    if (roomIdFromUrl) {
      setRoomId(roomIdFromUrl);
    }
  }, [searchParams]);

  const isRoomPage = pathname.startsWith('/room/');

  if (isRoomPage || roomId) {
    return (
      <GameProvider roomId={roomId || ''}>
        <JoinRoom roomId={roomId || ''} nickname={nickname} setNickname={setNickname} />
      </GameProvider>
    );
  }

  return <CreateRoom setRoomId={setRoomId} setNickname={setNickname} />;
}
