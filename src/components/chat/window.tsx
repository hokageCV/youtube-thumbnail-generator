'use client'

import { Message } from '@/types'
import { useEffect, useRef, useState } from 'react'
import { sendMessage } from './chat.api'
import { MessageCard } from './message-card'

export function Window() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [lastImageUrl, setLastImageUrl] = useState<string | null>(null)

  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) setImage(e.target.files[0])
  }

  async function handleSend(e: React.FormEvent) {
    e.preventDefault()
    if (!input.trim()) {
      alert('Please enter text before sending an image.')
      return
    }

    let base64Image: string | undefined
    if (image) {
      const buffer = await image.arrayBuffer()
      const rawBase64 = Buffer.from(buffer).toString('base64')
      base64Image = `data:${image.type};base64,${rawBase64}`
      setLastImageUrl(base64Image)
    } else if (!image && lastImageUrl) {
      base64Image = lastImageUrl
    }

    const userMessage: Message = { role: 'user', content: input, image: base64Image }
    const loadingMessage: Message = { role: 'loading', content: '🤖 Thinking...' }
    setMessages((prev) => [...prev, userMessage, loadingMessage])

    try {
      const reply = await sendMessage(input, base64Image)

      const serverMessage: Message = { role: 'server', content: reply.text, image: reply.image }
      setMessages((prev) => prev.map((msg) => (msg.role === 'loading' ? serverMessage : msg)))

      if (reply.image) setLastImageUrl(reply.image)
    } catch (err) {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.role === 'loading' ? { role: 'server', content: '🚩 Error contacting server' } : msg
        )
      )
    }

    setInput('')
    setImage(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  useEffect(() => {
    if (messagesEndRef.current) messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className='flex flex-col h-[80vh] min-w-[50%] max-w-4xl mx-auto border border-border rounded-lg shadow mt-5'>
      <div className='flex-1 overflow-y-auto p-4 space-y-2 bg-card'>
        {messages.map((msg, i) => (
          <MessageCard key={i} msg={msg} />
        ))}

        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSend} className='p-4 flex gap-2 border-t'>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            'Type a message.\nAdd details about channel category, target audience, expected induced emotion etc'
          }
          rows={3}
          className='flex-1 resize-none border border-gray-700 rounded-lg px-3 py-2  text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent'
        />
        <div className='flex items-center gap-2 mt-2 md:mt-0'>
          <label className='cursor-pointer px-4 py-2 bg-neutral text-gray-100 rounded-lg hover:bg-accent-hover max-w-[150px] overflow-hidden truncate'>
            {image ? image.name : 'Choose File'}
            <input
              type='file'
              accept='image/*'
              onChange={handleFileChange}
              ref={fileInputRef}
              className='hidden'
            />
          </label>

          <button
            type='submit'
            className='bg-accent hover:bg-accent-hover text-accent-text px-4 py-2 rounded-lg cursor-pointer'
          >
            Send
          </button>
        </div>
      </form>
    </div>
  )
}
