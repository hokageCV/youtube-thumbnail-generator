import LogoutButton from '@/components/logout';
import { Window } from '@/components/chat/window';

export default function Home() {
  return (
    <div className="flex flex-col w-full max-w-screen min-h-screen overflow-hidden border border-red-400">

      <div className="flex items-center justify-between px-4 py-4 bg-header border border-border">
        <h1 className="text-2xl font-bold text-center flex-1">
          Thumbnail Generator
        </h1>
        <LogoutButton />
      </div>

      <Window />
    </div>
  );
}
