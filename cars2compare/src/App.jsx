import Navbar from "./components/navbar.jsx";
import IntroductionPage from "./pages/introductionPage";
import SearchPage from "./pages/searchPage.jsx";
import SignUpPage from "./pages/signUpPage.jsx";
import CarsSavedPage from "./pages/CarsSavedPage.jsx";
import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<IntroductionPage />} />
        <Route path="/Search" element={<SearchPage />} />
        <Route path="/CarsSaved" element={<CarsSavedPage />} />
        <Route path="/SignUp" element={<SignUpPage />} />
      </Routes>
    </>
  );
}

export default App;
