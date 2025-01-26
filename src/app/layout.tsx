import type { Metadata } from "next";
import { Fredoka } from "next/font/google";
import Header from "./_components/Header";

import "./globals.css";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rocket Learning Platform",
  description: "Your personalized learning journey starts here",
  keywords:
    "education, online learning, courses, frontend, react, nextjs, html, css, javascript, fullstack",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fredoka.variable} font-fredoka antialiased`}>
        <Header />
        <div className="container mx-auto my-8 px-4 md:px-6 2xl:px-16">{children}</div>
      </body>
    </html>
  );
}
