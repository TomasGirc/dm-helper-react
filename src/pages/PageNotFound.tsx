import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <>
      <Navbar />
      <div className="sm:ml-64 h-screen">
        <div>
          404 not found here
          <Link to="/">Home</Link>
        </div>
      </div>
    </>
  );
}
