import { Outlet } from "react-router-dom";
import Navbar from "../components/NavbarMain";

const MainLayout = () => {
  return (
    <>
      <Navbar content={<Outlet />} />
    </>
  );
};
export default MainLayout;
