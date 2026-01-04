import Lottie from "lottie-react";

export default function AuthLayout({ children, animation }: { children: React.ReactNode, animation:any; }) {
  return (
    <main className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
     
      {/* Left side */}
      <section className="hidden lg:flex flex-col justify-center px-16 bg-linear-to-br from-blue-600 to-indigo-700 text-white">
        <h2 className="text-3xl font-extrabold mb-6 tracking-wide">
          <span className="bg-white/20 px-4 py-2 rounded-xl backdrop-blur-md shadow-lg text-white">
            TaskFlow
          </span>
        </h2>
        <h1 className="text-4xl font-bold mb-4">Organize work. Move faster.</h1>
        <p className="text-lg text-blue-100 mb-6">
          At TaskFlow, your projects stay organized, aligned, and always moving forward.
        </p>
        <ul className="space-y-3 text-base mb-10">
          <li>✔ Kanban-style task boards</li>
          <li>✔ Role-based access control</li>
          <li>✔ Secure authentication</li>
          <li>✔ Fast, modern UI</li>
        </ul>

        <div className="relative w-full max-w-md animate-float">
          <Lottie animationData={animation} loop />
        </div>

      </section>

      {/* Right side */}
      <section className="flex items-center justify-center bg-gray-50 dark:bg-background">
        {children}
      </section>
    </main>
  );
}