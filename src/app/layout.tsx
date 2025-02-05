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
        <div className="container mx-auto my-8 px-4 md:px-6 2xl:px-16">
          <ClientProviders>
            {children}
          </ClientProviders>
        </div>
      </body>
    </html>
  );
}
