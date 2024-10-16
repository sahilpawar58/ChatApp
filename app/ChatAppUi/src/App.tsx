import { FormEvent, useRef, useState, useEffect } from 'react';
import './App.css';
import { io } from "socket.io-client";

function App() {
  const [socket, setSocket] = useState<any>(null);
  const input = useRef<HTMLInputElement | null>(null);
  const messages = useRef<HTMLUListElement | null>(null);
  const activity = useRef<HTMLParagraphElement | null>(null);
  let activityTimer: NodeJS.Timeout | null = null;
  

  // Initialize the socket connection once when the component mounts
  useEffect(() => {
    const newSocket = io('ws://localhost:3000');
    setSocket(newSocket);

    
    // Set up the 'message' event listener once
    newSocket.on("message", (data: string) => {
      if(activity.current){
        activity.current.textContent=""
      }
      if (messages.current) {
        const li = document.createElement('li');
        li.textContent = data;
        messages.current.appendChild(li);
      }
    });

    newSocket.on("activity", (name:string)=>{
      if(activity.current){
        activity.current.textContent = `${name} is typing`;
      }
      if (activityTimer) {
        clearTimeout(activityTimer);
      }

      activityTimer = setTimeout(() => {
        if (activity.current) {
          activity.current.textContent = "";
        }
      }, 3000);
    })
    

    // Clean up the socket connection on component unmount
    
  }, []);

  function handleKeyPress() {
    if (socket) {
      socket.emit('activity', socket.id.substring(0, 5)); // Emit activity event when typing
    }
  }

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
        <input ref={input} type="text" placeholder="Your message" onKeyDown={handleKeyPress}/>
        <button type="submit">Send</button>
      </form>
      <ul ref={messages}></ul>
      <p ref={activity}></p>
    </>
  );
}

export default App;
