
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="tracking-wide antialiased">{children}</body>
    </html>
  );
}
