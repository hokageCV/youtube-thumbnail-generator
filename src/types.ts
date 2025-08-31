export type User = {
  username: string
  password: string
}

export type Message = {
  role: "user" | "server"
  content: string
  image?: string
}

export type ChatWindowProps = {
  title?: string;
  initialMessages?: Message[];
  onSendMessage?: (message: string) => void;
  className?: string;
}
