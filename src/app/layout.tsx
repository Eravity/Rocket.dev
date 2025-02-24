import type { Metadata } from "next";
import Header from "./_components/Header";
import ClientProviders from "./ClientProviders";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rocket",
  description: "Your personalized learning journey starts here",
  keywords:
    "education, online learning, courses, frontend, react, nextjs, html, css, javascript, fullstack",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="tracking-wide antialiased">
        <Header />
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
