import type { Metadata } from "next";
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
  title: "Shivam Goel",
  description: "Robotics & RL Research",
  openGraph: {
    title: "Shivam Goel",
    description: "Robotics & RL Research",
    url: "https://shivamgoel.com",
    siteName: "Shivam Goel",
    images: [
      {
        url: "/profile.jpg", // custom thumbnail image
        width: 1200,
        height: 630,
        alt: "Shivam Goel Research",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.png"], // same image for Twitter/X
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
