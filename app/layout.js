import { Inter, Open_Sans, Outfit} from "next/font/google";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"], });

export const metadata = {
  title: "PeraPinoy!",
  description: "A Financial app with AI Chatbot designed for Pinoy",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={outfit.className}>{children}</body>
    </html>
  );
}
