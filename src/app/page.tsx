import { GameBoard } from '@/features/game/ui/GameBoard';
import { GameControls } from '@/features/game/ui/GameControls';
import { GameHeader } from '@/widgets/GameHeader';
import { GameFooter } from '@/widgets/GameFooter';
import { GameProvider } from '@/features/game/model/gameContext';

export default function Home() {
  return (
    <GameProvider>
      <div className="flex flex-col min-h-screen">
        <GameHeader />
        <main className="flex-grow container mx-auto px-4 py-8">
          <GameBoard />
          <GameControls />
        </main>
        <GameFooter />
      </div>
    </GameProvider>
  );
}
