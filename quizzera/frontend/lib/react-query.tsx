"use client";
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

let queryClient: QueryClient | null = null;

function getClient() {
  if (!queryClient) {
    queryClient = new QueryClient();
  }
  return queryClient;
}

export function ReactQueryClientProvider({ children }: { children: React.ReactNode }) {
  const client = getClient();
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}