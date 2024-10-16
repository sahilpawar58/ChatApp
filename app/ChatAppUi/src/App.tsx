import { FormEvent, useRef, useState, useEffect } from 'react';
import './App.css';
import { io } from "socket.io-client";

function App() {
  const [socket, setSocket] = useState<any>(null);
  const input = useRef<HTMLInputElement | null>(null);
  const messages = useRef<HTMLUListElement | null>(null);

  // Initialize the socket connection once when the component mounts
  useEffect(() => {
    const newSocket = io('ws://localhost:3000');
    setSocket(newSocket);

    // Set up the 'message' event listener once
    newSocket.on("message", (data: string) => {
      if (messages.current) {
        const li = document.createElement('li');
        li.textContent = data;
        messages.current.appendChild(li);
      }
    });

    // Clean up the socket connection on component unmount
    return () => {
      newSocket.disconnect();
    };
  }, []);

  function sendMessage(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (input.current && socket) {
      socket.emit('message', input.current.value); // Emit 'message' event with the input value
      input.current.value = ''; // Clear input after sending message
    }
  }

  return (
    <>
      <form onSubmit={sendMessage}>
        <input ref={input} type="text" placeholder="Your message" />
        <button type="submit">Send</button>
      </form>
      <ul ref={messages}></ul>
    </>
  );
}

export default App;
