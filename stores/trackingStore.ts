import { create } from "zustand";

interface TrackingState {
  socket: WebSocket | null;
  connected: boolean;
  location: { lat: number; lng: number } | null;

  connect: (token: string, parcelId: string) => void;
  disconnect: () => void;
}

export const useTrackingStore = create<TrackingState>((set, get) => ({
  socket: null,
  connected: false,
  location: null,

  connect: (token: string, parcelId: string) => {
    if (!token || !parcelId) return;

    // Close existing socket if switching parcels
    const existing = get().socket;
    if (existing) {
      existing.close(1000, "Switch parcel");
    }

    const WS_URL = process.env.NEXT_PUBLIC_WS_URL;

    const socket = new WebSocket(
      `${WS_URL}/ws/live/location/${parcelId}/?token=${token}`
    );

    socket.onopen = () => {
      console.log("✅ Live Tracking Connected");
      set({ connected: true });
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      // Expected backend:
      // { lat, lng }

      set({
        location: {
          lat: data.lat,
          lng: data.lng,
        },
      });
    };

    socket.onclose = (event) => {
      console.log("❌ Tracking socket closed", event.code);
      set({ socket: null, connected: false });
    };

    socket.onerror = (error) => {
      console.error("Tracking WebSocket Error:", error);
    };

    set({ socket });
  },

  disconnect: () => {
    const socket = get().socket;
    if (socket) {
      socket.close(1000, "Manual disconnect");
    }

    set({
      socket: null,
      connected: false,
      location: null,
    });
  },
}));
