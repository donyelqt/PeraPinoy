import { Inter, Open_Sans, Outfit} from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], });

export const metadata = {
  title: "PeraPinoy!",
  description: "A Financial app with AI Chatbot designed for Pinoy",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
