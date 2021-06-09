import React,{useEffect,useState} from 'react';
import './App.css';
import Chat from './Components/chatComponent/Chat';
import Sidebar from './Components/sidebarComponent/Sidebar';
import Pusher from 'pusher-js' 
import axios from './axios'

function App() {
  const [messages,setMessages]=useState([])

  useEffect(()=>{
    axios.get('/messages/sync')
    .then(response=>{
      setMessages(response.data)
    });
  },[])
  

  useEffect(()=>{
    const pusher = new Pusher('da29a737ebebcfce0cd2', {
      cluster: 'ap2'
    });

    const channel = pusher.subscribe('message');
    channel.bind('inserted',(newMesssage)=>{
      setMessages([...messages, newMesssage])
    });

    return()=>{
      channel.unbind_all();
      channel.unsubscribe();
    };
  },[messages])
  console.log(messages)

  return (
    <div className="app">
      <div className="app__body">

        <Sidebar/>
        <Chat messages={messages}/>
      </div>
    </div>
  );
}

export default App;
