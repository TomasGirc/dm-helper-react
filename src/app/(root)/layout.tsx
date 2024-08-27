"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MakeSidebar from "src/components/sidebar/Sidebar";

const queryClient = new QueryClient();

function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <MakeSidebar content={children} />
      </QueryClientProvider>
    </>
  );
}

export default layout;
