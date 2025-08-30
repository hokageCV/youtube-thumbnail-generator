
export type Message =  {
  id: string;
  text: string;
  sender: 'user' | 'other';
  timestamp: Date;
}

export type ChatWindowProps = {
  title?: string;
  initialMessages?: Message[];
  onSendMessage?: (message: string) => void;
  className?: string;
}
