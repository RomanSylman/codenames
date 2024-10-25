'use client';

import { useState } from 'react';
import { Button } from '@/shared/ui/Button';
import { useRouter } from 'next/navigation';

interface CreateRoomProps {
  setRoomId: (roomId: string) => void;
  setNickname: (nickname: string) => void;
}

export const CreateRoom: React.FC<CreateRoomProps> = ({ setRoomId, setNickname }) => {
  const [inputNickname, setInputNickname] = useState('');
  const [roomLink, setRoomLink] = useState('');
  const router = useRouter();

  const handleCreateRoom = () => {
    if (inputNickname.trim()) {
      const newRoomId = Math.random().toString(36).substring(2, 8).toUpperCase();
      setRoomId(newRoomId);
      setNickname(inputNickname);
      const link = `${window.location.origin}/room/${newRoomId}`;
      setRoomLink(link);
    }
  };

  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(roomLink);
    alert('Link copied to clipboard!');
  };

  const joinRoom = () => {
    router.push(roomLink);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-orange-900">
      <h1 className="text-4xl font-bold text-white mb-8">CodeNames</h1>
      {!roomLink ? (
        <>
          <input
            type="text"
            placeholder="Enter your nickname"
            value={inputNickname}
            onChange={(e) => setInputNickname(e.target.value)}
            className="mb-4 p-2 rounded"
          />
          <Button onClick={handleCreateRoom}>Create Room</Button>
        </>
      ) : (
        <>
          <p className="text-white mb-4">Room created! Share this link with others:</p>
          <input
            type="text"
            value={roomLink}
            readOnly
            className="mb-4 p-2 rounded w-full max-w-md"
          />
          <div className="flex space-x-4">
            <Button onClick={copyLinkToClipboard}>Copy Link</Button>
            <Button onClick={joinRoom}>Join Room</Button>
          </div>
        </>
      )}
    </div>
  );
};
