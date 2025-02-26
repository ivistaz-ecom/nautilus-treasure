import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title:
    "Interactive Game: Discover Hidden Costs in Maritime Operations | Nautilus Shipping",
  description:
    "Dive into our interactive game at Nautilus Shipping and uncover the often-overlooked hidden costs in maritime operations. Engage in this educational experience to learn about the complexities of shipping economics, including crew management, compliance, and operational expenses. Play now to enhance your understanding and make informed decisions in the shipping industry.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
