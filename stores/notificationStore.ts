import { create } from 'zustand';

interface NotificationState {
  socket: WebSocket | null;
  notifications: any[];
  connected: boolean;
  currentToken: string | null;

  connect: (token: string) => void;
  disconnect: () => void;
  setNotifications: (notifications: any[]) => void;
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  socket: null,
  notifications: [],
  connected: false,
  currentToken: "",

  setNotifications: (notifications: any[]) => {
    set({ notifications });
  },

  connect: (token: string) => {
    console.log("Connecting with token:", token);

    if (!token) {
      console.log("❌ No token found");
      return;
    }

    if (get().socket) return;



    const WS_URL = process.env.NEXT_PUBLIC_WS_URL;

    const socket = new WebSocket(
      `${WS_URL}/ws/notifications/?token=${token}`
    );

    set({ socket, currentToken: token, connected: true });

    socket.onopen = () => {
      console.log('✅ WebSocket Connected');
      set({ connected: true });
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      set((state) => ({
        notifications: [data, ...state.notifications],
      }));
    };

    socket.onclose = (event) => {
      console.log('❌ WebSocket Disconnected', event.code);

      set({ socket: null, connected: false });

      const token = get().currentToken; // use session token
      if (!token) return;

      setTimeout(() => {
        console.log("🔄 Reconnecting...");
        get().connect(token);
      }, 3000);
    };


    socket.onerror = (error) => {
      console.error('WebSocket Error:', error);
    };

    set({ socket });
  },

  disconnect: () => {
    const socket = get().socket;
    if (socket) {
      socket.close();
    }
    set({ socket: null, connected: false });
  },
}));
