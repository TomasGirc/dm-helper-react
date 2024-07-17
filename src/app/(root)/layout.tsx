"use client";

import React from "react";
import Navbar from "src/components/NavbarMain";

function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar content={children} />
    </>
  );
}

export default layout;
