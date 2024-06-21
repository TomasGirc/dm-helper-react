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
import PageNotFound from "./layout/PageNotFound";
import CityPage from "./pages/CityPage";
import TestPage from "./pages/TestPage";
import CharacterPage from "./pages/CharacterPage";
import ItemPage from "./pages/ItemPage";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />} errorElement={<PageNotFound />}>
        <Route index element={<HomePage />} />
        <Route path="/city" element={<CitysPage />} />
        <Route path="/city/:cityId" element={<CityPage />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/character/:characterId" element={<CharacterPage />} />
        <Route path="/items" element={<ItemPage />} />
        {/* <Route path="/item/:characterId" element={<CharacterPage />} /> */}
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
