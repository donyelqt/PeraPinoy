import { Inter, Outfit, Montserrat } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster, toast } from 'sonner'

const outfit = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "PeraPinoy!",
  description: "A Financial app with AI Chatbot designed for Pinoy",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <head>
        <link rel="icon" href="/PeraPinoy.png"/>
      </head>
      <body className={outfit.className}>
        <Toaster />
        {children}</body>
    </html>
    </ClerkProvider>
  );
}

