import Lottie from "lottie-react";

export default function AuthLayout({
  children,
  animation,
}: {
  children: React.ReactNode;
  animation: any;
}) {
  return (
    <main className="h-full w-full overflow-y-auto lg:overflow-hidden">

      {/* ================= MOBILE LAYOUT ================= */}
      <section className="flex flex-col lg:hidden bg-blue-600 text-white px-6 py-8">
        <h2 className="text-3xl mb-4 flex items-center">
          <span className="w-10 h-10 rounded-full bg-emerald-300 text-emerald-900 flex items-center justify-center mr-2">
            T
          </span>
          TaskFlow
        </h2>
        <div className="max-w-xs mx-auto mb-6">
          <Lottie animationData={animation} loop />
        </div>
        <h1 className="text-2xl font-bold mb-3">
          Organize work. Move faster.
        </h1>

        <p className="text-yellow-200 mb-4">
          Manage tasks and teams with a clean Kanban workflow.
        </p>
        <div className="bg-blue rounded-xl  text-black">
          {children}
        </div>
      </section>

      {/* ================= DESKTOP LAYOUT ================= */}
      <section className="hidden lg:grid grid-cols-2 h-full">

        {/* Left side */}
        <div className="flex flex-col px-16 bg-blue-600 text-white justify-start pt-6">
          <h2 className="text-5xl mb-6 flex items-center">
            <span className="w-12 h-12 rounded-full bg-emerald-300 text-emerald-900 flex items-center justify-center mr-2 animate-float">
              T
            </span>
            askFlow
          </h2>

          <h1 className="text-4xl mb-6">
            Organize work. Move faster.
          </h1>

          <p className="text-yellow-300 text-xl mb-8">
            At TaskFlow, your projects stay organized and always moving forward.
          </p>

          <ul className="space-y-3 text-base mb-10 font-mono mt-4"> <li><span className="tick">✔</span> Kanban-style task boards</li> <li><span className="tick">✔</span> Role-based access control</li> <li><span className="tick">✔</span> Secure authentication</li> <li><span className="tick">✔</span> Fast, modern UI</li> </ul>

          <div className="max-w-md  ">
            <Lottie animationData={animation} loop />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center justify-center bg-gray-50 dark:bg-background -mt-15">
          {children}
        </div>
      </section>
    </main>
  );
}
