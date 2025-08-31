import LogoutButton from '@/components/logout';
import { Window } from '@/components/window';

export default function Home() {
  return (
    <div className="flex flex-col w-full max-w-5xl min-h-screen overflow-hidden">
      <LogoutButton />
      <Window />
    </div>
  );
}
