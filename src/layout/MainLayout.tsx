import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <div className="sm:ml-64 h-screen">
        <Outlet />
      </div>
    </>
  );
};
export default MainLayout;
