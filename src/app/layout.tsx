/* eslint-disable react-refresh/only-export-components */
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DM Helper",
  description: "Helper for all storytellers.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
