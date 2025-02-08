"use client";

import "@triumph-motorcycles/css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="h-full bg-white">
      <body className="h-full">
        <main>
          <div>{children}</div>
        </main>
      </body>
    </html>
  );
}
