import Navbar from "./components/Navbar.jsx";
import IntroductionPage from "./pages/IntroductionPage";
import SearchPage from "./pages/SearchPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import CatalogPage from "./pages/CatalogPage.jsx";
import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<IntroductionPage />} />
        <Route path="/Search" element={<SearchPage />} />
        <Route path="/Catalog" element={<CatalogPage />} />
        <Route path="/SignUp" element={<SignUpPage />} />
      </Routes>
    </>
  );
}

export default App;
