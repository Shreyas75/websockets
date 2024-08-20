import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [socket, setSocket] = useState<null | WebSocket>(null);
  const [latestMessage, setLatestMessage] = useState("");
  const [message, setMessage] = useState("")

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080')
    socket.onopen = () => {
      console.log('Connected')
      setSocket(socket);
    }

    socket.onmessage = (message) => {
      console.log('Recieved Message: ', message.data)
      setLatestMessage(message.data);
    }


    return () => {
      socket.close();
    }
  }, [])

  if(!socket) {
    return <div>
      Connecting to Socket Server...
    </div>
  }

  return (
    <div>
      <input onChange={(e) => 
        setMessage(e.target.value)
      }></input>
      <div>
        <button onClick={() => {
          socket.send(message);
        }}></button>
      </div>
      
      {latestMessage}
    </div>
  )
}

export default App
