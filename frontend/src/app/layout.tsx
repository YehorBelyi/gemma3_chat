import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/header/header";
import { ApiProvider } from "@/app/contexts/ApiContext";

export const metadata: Metadata = {
  title: "Gemma 3",
  description: "Your personal AI assistant!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ApiProvider >
        <body className="flex flex-col h-screen">
          <Header />
          {children}
        </body>
      </ApiProvider>
    </html>
  );
}
