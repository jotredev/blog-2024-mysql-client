import { Outlet } from "react-router-dom";
import Header from "../components/widgets/Header";

const MainLayout = () => {
  return (
    <div>
      <Header />
      <main className="mt-20 md:mt-24 max-w-[1000px] mx-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
