import { Inter, Outfit, Montserrat, Roboto, Open_Sans } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster, toast } from 'sonner'

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "PeraPinoy!",
  description: "A Financial app with AI Chatbot designed for Pinoy",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
    publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
    <html lang="en">
      <head>
        <link rel="icon" href="/PeraPinoy.png"/>
      </head>
      <body className={montserrat.className}>
        <Toaster richColors />
        {children}</body>
    </html>
    </ClerkProvider>
  );
}

