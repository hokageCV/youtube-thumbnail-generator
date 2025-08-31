"use client"

import { Message } from '@/types'
import { useState } from "react"
import { sendMessage } from './chat.api'

export function Window() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")

  async function handleSend(e: React.FormEvent) {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage: Message = { role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])

    try {
      const reply = await sendMessage(input)
      const serverMessage: Message = { role: "server", content: reply }

      setMessages((prev) => [...prev, serverMessage])
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "server", content: "🚩 Error contacting server" },
      ])
    }

    setInput("")
  }

  return (
    <div className="flex flex-col h-[80vh] min-w-[50%] max-w-4xl mx-auto border border-border rounded-lg shadow mt-5">
    <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-card">
      {messages.map((msg, i) => (
        <div
          key={i}
          className={`flex ${
            msg.role === "user" ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`inline-block p-2 rounded-lg max-w-[60%] break-words text-gray-800 ${ msg.role === "user" ? "bg-accent-card-2" : "bg-accent-card" }`}
          >
            {msg.content}
          </div>
        </div>
      ))}
    </div>

    <form onSubmit={handleSend} className="p-4 flex gap-2 border-t">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 border rounded-lg px-3 py-2"
      />
      <button
        type="submit"
        className="bg-accent-hover hover:bg-accent text-accent-text px-4 py-2 rounded-lg cursor-pointer"
      >
        Send
      </button>
    </form>
  </div>
  )
}
