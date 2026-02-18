import { create } from "zustand";

interface TrackingState{
    socket:WebSocket | null;
    connected:boolean;
    currentToken:string | null;
    locations:Record<string,{lat:number,lng:number}> | null;
    connect:(token:string)=>void;
    // disconnect:()=>void;
}

export const useTrackingStore=create<TrackingState>((set,get)=>({
    socket:null,
    connected:false,
    currentToken:null,
    locations:{},
    connect:(token:string)=>{
        if (!token) {
            console.log("No token for live tracking");
            return;
            
        }
        if (get().socket) return;
        const WS_URL=process.env.NEXT_PUBLIC_WS_URL;
        const socket=new WebSocket(
            `${WS_URL}/ws/live/location/4b869d64-10cf-4113-86c1-8e8f1be02953/?token=${token}`
        )
        socket.onopen=()=>{
            console.log("web socket connected for live tracking");
            set({ connected: true, currentToken: token });
            
        }
        socket.onmessage=(event)=>{
            const data=JSON.parse(event.data);
            set((state)=>({
                locations:{...state.locations,[data.driverId]:{let:data.lat,lng:data.lng}}
            }))
        }
        socket.onclose = (event) => {
      console.log("❌ Live Tracking WebSocket Disconnected", event.code);

      set({ socket: null, connected: false });

      // Auto-reconnect using saved token
      const token = get().currentToken;
      if (!token) return;

      setTimeout(() => {
        console.log("🔄 Reconnecting Live Tracking...");
        get().connect(token);
      }, 3000);
    };

    socket.onerror = (error) => {
      console.error("Live Tracking WebSocket Error:", error);
    };

    set({ socket });
    }

//     disconnect: () => {
//     const socket = get().socket;
//     if (socket) {
//       socket.close(1000, "Manual disconnect");
//     }
//     set({ socket: null, connected: false });
//   }
}))