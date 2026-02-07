"use client";

import { SessionProvider } from "next-auth/react";
import React from "react";

// Fix: Make children optional to resolve TypeScript error where 'children' property is treated as missing in some contexts
export default function AuthProvider({ children }: { children?: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}