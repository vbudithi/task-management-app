import Lottie from "lottie-react";
import frontpageAnimation from "@/public/animations/frontpage.json";

export default function AuthLayout({
  children,
  animation,
}: {
  children: React.ReactNode;
  animation: any;
}) {
  return (
    <main className="h-full w-full overflow-y-auto lg:overflow-hidden">
      {/* MOBILE LAYOUT*/}
      <section className="block md:hidden flex-col bg-blue-600 text-white px-6 py-8">
        <h2 className="text-5xl mb-4 flex items-center">
          <span className="w-13 h-13 rounded-full bg-emerald-300 text-emerald-900 flex items-center justify-center mr-2  animate-float">
            T
          </span>
          askFlow
        </h2>
        <p className="text-yellow-300 text-xl mb-10 mt-10">
          At TaskFlow, your projects stay organized and always moving forward.
        </p>
        <h1 className="text-3xl mb-6 text-red-300 text-center ">Organize Work. Move Faster.</h1>

        <ul className="space-y-3 text-base mb-10 font-mono mt-10"> <li><span className="tick">✔</span> Kanban-style task boards</li> <li><span className="tick">✔</span> Role-based access control</li> <li><span className="tick">✔</span> Secure authentication</li> <li><span className="tick">✔</span> Fast, modern UI</li> </ul>

        <div className="rounded-xl text-black ">
          {children}
        </div>
        <p className="text-md text-yellow-200 mt-7 italic text-center">
          Manage tasks and teams with a clean Kanban workflow.
        </p>
        <div className="max-w-md">
          <Lottie animationData={animation} loop />
        </div>
      </section>

      {/* DESKTOP LAYOUT */}
      <section className="hidden md:grid grid-cols-2 h-full">

        {/* LEFT SIDE */}
        <div className="flex flex-col px-16 bg-blue-600 text-white pt-6">
          <h2 className="text-6xl mb-6 flex items-center">
            <span className="w-13 h-13 rounded-full bg-emerald-300 text-emerald-900 flex items-center justify-center mr-2 animate-float">
              T
            </span>
            <span>
              askFlow
            </span>
          </h2>

          <h1 className="text-3xl mb-6 text-red-300">Organize Work. Move Faster.</h1>
          <p className="text-yellow-300 text-xl mb-4">
            At TaskFlow, your projects stay organized and always moving forward.
          </p>
          <ul className="space-y-3 text-base mb-10 font-mono mt-4"> <li><span className="tick">✔</span> Kanban-style task boards</li> <li><span className="tick">✔</span> Role-based access control</li> <li><span className="tick">✔</span> Secure authentication</li> <li><span className="tick">✔</span> Fast, modern UI</li> </ul>
          <p className="text-md text-yellow-200 mt-2 italic">
            Manage tasks and teams with a clean Kanban workflow.
          </p>
          <div className="max-w-md">
            <Lottie animationData={animation} loop />
          </div>
        </div>
        {/* RIGHT SIDE */}
        <div className="flex items-center justify-start bg-gray-50">
          <div className="w-full max-w-sm opacity-80 pointer-events-none">
            <Lottie animationData={frontpageAnimation} loop />
          </div>
          <div className=" max-w-md items-center ">
            {children}
          </div>
        </div>
      </section>
    </main>
  );
}