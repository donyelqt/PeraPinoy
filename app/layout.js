import { Inter, Outfit, Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "PeraPinoy!",
  description: "A Financial app with AI Chatbot designed for Pinoy",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/PeraPinoy.png"/>
      </head>
      <body className={montserrat.className}>{children}</body>
    </html>
  );
}

