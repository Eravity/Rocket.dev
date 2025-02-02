import type { Metadata } from "next";
// import { Plus_Jakarta_Sans } from "next/font/google";
import Header from "./_components/Header";

import "./globals.css";

// const plusJakartaSans = Plus_Jakarta_Sans({
//   variable: "--font-Plus_Jakarta_Sans",
//   subsets: ["latin"],
//   weight: "400"
// });

export const metadata: Metadata = {
  title: "Rocket",
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
      <body className={` tracking-wide antialiased`}>
        <Header />
        <div className="container mx-auto my-8 px-4 md:px-6 2xl:px-16">{children}</div>
      </body>
    </html>
  );
}
