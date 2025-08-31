import LogoutButton from '@/components/logout';
import { Window } from '@/components/chat/window';

export default function Home() {
  return (
    <div className="flex flex-col w-full max-w-screen min-h-screen overflow-hidden border border-red-400">
      <LogoutButton />
      <Window />
    </div>
  );
}
