import Header from "@/components/header";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 h-full w-full bg-[#05050a] bg-[radial-gradient(#ffffff10_1px,transparent_1px)] [background-size:24px_24px]"></div>
      <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-purple-500 opacity-20 blur-[100px]"></div>

      <main className="min-h-screen container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <Header />
        <Outlet />
      </main>

      <footer className="p-10 text-center border-t border-white/10 mt-10 backdrop-blur-md bg-black/20">
        <p className="text-gray-400 font-medium">
          &copy; {new Date().getFullYear()} <span className="text-purple-400 font-bold">Shortify</span>. Simplify your digital footprint.
        </p>
      </footer>
    </div>
  );
};

export default AppLayout;
