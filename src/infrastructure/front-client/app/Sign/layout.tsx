export default function SignLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-[#333] p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {children}
      </div>
    </div>
  );
}
