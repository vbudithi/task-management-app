import Navbar from "@/components/layout/Navbar";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-full">
        <Navbar />
      <main className="flex-1 overflow-hidden">
        {children}
      </main>
    </div>
  );
}