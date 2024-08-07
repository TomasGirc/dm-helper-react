"use client";

import React from "react";
import MakeSidebar from "src/components/sidebar/Sidebar";

function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* <Navbar content={children} /> */}
      <MakeSidebar content={children} />
    </>
  );
}

export default layout;
