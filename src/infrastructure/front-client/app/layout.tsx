import "@triumph-motorcycles/css";
import Header from "@/components/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        <Header />
        <main className="bg-white">
          <div className="relative isolate pt-14">{children}</div>
        </main>
      </body>
    </html>
  );
}
