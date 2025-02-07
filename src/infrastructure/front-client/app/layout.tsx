import '@triumph-motorcycles/css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
