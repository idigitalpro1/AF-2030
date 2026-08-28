export const metadata = {
  title: "idigitalpro.com router",
  description: "Edge router for idigitalpro.com → Shop Desk / Nest / Codex",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
