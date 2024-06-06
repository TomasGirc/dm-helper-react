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
import PageNotFound from "./pages/PageNotFound";
import CityPage from "./pages/CityPage";
import TestPage from "./pages/TestPage";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />} errorElement={<PageNotFound />}>
        <Route index element={<HomePage />} />
        <Route path="/city" element={<CitysPage />} />
        <Route path="/city/:cityId" element={<CityPage />} />
        <Route path="/test" element={<TestPage />} />
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
