import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'


const socket = io('http://localhost:5000')

const App = () => {

  const [messages, setMessages] = useState([])
  const [messageInput, setMessageInput] = useState('')

  useEffect(() => {
    socket.on("messages", (msg) => {
      setMessages([...messages, msg])
    })

    return () => {
      socket.off("messages")
    }
  }, [messages])

  const sendMessage = () => {
    if (messageInput.trim() !== '') {
      socket.emit("message", messageInput)
      setMessageInput("")
    }
  }

  return (
    <div>
      <h1>Simple Chat App</h1>
      <input type="text" value={messageInput} placeholder='Type your message...' onChange={(e) => setMessageInput(e.target.value)} />
      <button onClick={sendMessage}>Send</button>


      <section>
        {messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </section>
    </div>
  )
}

export default App