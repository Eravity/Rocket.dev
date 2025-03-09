export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Removed <html> and <body> for proper layout inheritance.
  return (
    <>
      {children}
    </>
  );
}
