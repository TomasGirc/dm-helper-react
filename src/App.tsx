import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import "./App.css";
import MainLayout from "./layout/MainLayout";
import HomePage from "./pages/HomePage";
import CitysPage from "./pages/CitysPage";
import { cityType } from "./assets/types";
import PageNotFound from "./pages/PageNotFound";
import CityPage from "./pages/CityPage";

const App = () => {
  const data_from_city = (data: cityType[]) => {
    // console.log(data); // or set the data to a state
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />} errorElement={<PageNotFound />}>
        <Route index element={<HomePage />} />
        <Route path="/city" element={<CitysPage citydata={data_from_city} />} />
        <Route path="/city/:cityId" element={<CityPage />} />
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
