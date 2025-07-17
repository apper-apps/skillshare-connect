import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
  return (
<div className="min-h-screen bg-warm-white">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;