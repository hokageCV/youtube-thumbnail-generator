import { Message } from '@/types'

type MessageCardProps = {
  msg: Message
}

export function MessageCard({ msg }: MessageCardProps) {
  function downloadImage() {
    if (!msg.image) return
    const link = document.createElement('a')
    link.href = msg.image
    link.download = `image_${Date.now()}.png`
    link.click()
  }

  return (
    <div className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`inline-block p-2 rounded-lg max-w-[60%] break-words relative text-gray-900 ${
          msg.role === 'user' ? 'bg-accent-card-2 ' : 'bg-accent-card '
        }`}
      >
        {msg.content && <div>{msg.content}</div>}

        {msg.image && (
          <div className='relative mt-2'>
            <button
              onClick={downloadImage}
              className='absolute top-1 right-1 bg-gray-700 text-white px-2 py-1 rounded opacity-80 hover:opacity-100 text-sm cursor-pointer'
              title='Download Image'
            >
              ⬇
            </button>
            <img src={msg.image} alt='uploaded' className='max-w-full rounded' />
          </div>
        )}
      </div>
    </div>
  )
}
