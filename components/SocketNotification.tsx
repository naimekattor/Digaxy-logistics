"use client"
import { useSession } from 'next-auth/react';
import React, { useEffect, useRef } from 'react'

const SocketNotification = () => {
        const { data: session, status } = useSession();
    
    const socketRef=useRef<WebSocket | null>(null)

    
    // websocket notification 
    useEffect(()=>{
        const token=session.accessToken;
        if (!token) return;
        const socket =new WebSocket(
            `ws://10.10.13.16:8400/ws/notifications/?token=${token}`
        );

        socket.onopen=()=>{
            console.log("WebSocket Connected");
            
        }
        socket.onmessage=(event)=>{
            const data=JSON.parse(event.data);
            console.log("Notification",data);
            

        }
        socket.onclose=()=>{
            console.log("websocket disconnected");
            
        }
        socket.onerror=(error)=>{
           console.error("Websocket error",error);
           
        }
        socketRef.current=socket;
        return ()=>{
            socket.close();
        }
    },[])
  return (
    <div>
      
    </div>
  )
}

export default SocketNotification
