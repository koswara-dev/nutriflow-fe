import React, { useEffect, useState } from 'react'
import SockJS from 'sockjs-client'
import Stomp, { Client, Frame } from 'stompjs'

interface ChatMessage {
  sender: string
  content: string
  type: 'JOIN' | 'CHAT' | 'LEAVE' | 'PRIVATE'
  recipient?: string // Optional recipient for private messages
}

const ChatComponent = () => {
  const [stompClient, setStompClient] = useState<Client | null>(null)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [messageInput, setMessageInput] = useState('')
  const [recipient, setRecipient] = useState('')
  const [username, setUsername] = useState('') // Now a state variable
  const [tempUsername, setTempUsername] = useState('') // For input before joining
  const [isChatConnected, setIsChatConnected] = useState(false)

  const handleJoinChat = () => {
    if (tempUsername.trim()) {
      setUsername(tempUsername.trim())
      setIsChatConnected(true)
    }
  }

  useEffect(() => {
    if (!isChatConnected || !username) return

    const socket = new SockJS('http://localhost:8080/ws') // Adjust URL as needed
    const client: Client = Stomp.over(socket)

    client.connect(
      {},
      (frame?: Frame) => {
        console.log('Connected: ' + frame)
        setStompClient(client)

        // Subscribe to the public topic
        client.subscribe('/topic/public', (message: Frame) => {
          const chatMessage: ChatMessage = JSON.parse(message.body)
          setMessages((prevMessages) => [...prevMessages, chatMessage])
        })

        // Subscribe to private messages for this user
        client.subscribe(`/user/${username}/private`, (message: Frame) => {
          const chatMessage: ChatMessage = JSON.parse(message.body)
          setMessages((prevMessages) => [...prevMessages, chatMessage])
        })

        // Send a JOIN message
        client.send(
          '/app/chat.addUser',
          {},
          JSON.stringify({ sender: username, type: 'JOIN' })
        )
      },
      (error: string | Frame) => {
        console.error('STOMP error:', error)
        setIsChatConnected(false) // Disconnect on error
        setStompClient(null)
      }
    )

    return () => {
      if (client && client.connected) {
        client.disconnect(() => {
          console.log('Disconnected')
        })
      }
    }
  }, [isChatConnected, username]) // Dependencies for useEffect

  const sendMessage = () => {
    if (stompClient && stompClient.connected && messageInput) {
      const chatMessage: ChatMessage = {
        sender: username,
        content: messageInput,
        type: recipient ? 'PRIVATE' : 'CHAT',
        recipient: recipient || undefined // Include recipient if available
      }

      const destination = recipient
        ? `/app/chat.privateMessage/${recipient}`
        : '/app/chat.sendMessage'

      stompClient.send(destination, {}, JSON.stringify(chatMessage))
      setMessageInput('')
      setRecipient('') // Clear recipient after sending
    }
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">
        NutriFlow Chat
      </h1>

      {!isChatConnected ? (
        <div className="flex flex-col items-center justify-center flex-grow">
          <input
            type="text"
            value={tempUsername}
            onChange={(e) => setTempUsername(e.target.value)}
            placeholder="Enter your username"
            className="p-3 border border-gray-300 rounded-lg mb-4 w-full max-w-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleJoinChat}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Join Chat
          </button>
        </div>
      ) : (
        <>
          <div className="flex-grow overflow-y-auto bg-white p-4 rounded-lg shadow-md mb-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-2 p-2 rounded-lg ${
                  msg.sender === username
                    ? 'bg-blue-100 self-end text-right'
                    : 'bg-gray-100 self-start text-left'
                }`}
              >
                <strong className="font-semibold text-gray-800">
                  {msg.sender}:
                </strong>{' '}
                <span className="text-gray-700">{msg.content}</span>{' '}
                <span className="text-gray-500 text-sm">({msg.type})</span>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="Recipient (optional, for private message)"
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex">
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-grow p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={sendMessage}
                className="bg-blue-600 text-white px-6 py-3 rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Send
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default ChatComponent
