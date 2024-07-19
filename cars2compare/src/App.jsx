import Navbar from "./components/navbar.jsx";
import IntroductionPage from "./pages/introductionPage";
import SearchPage from "./pages/searchPage.jsx";
import SignInPage from "./pages/signInPage.jsx";
import CarsSavedPage from "./pages/CarsSavedPage.jsx";
import RegisterPage from "./pages/registerPage.jsx";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/footer.jsx";


function App() {
  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<IntroductionPage />} />
        <Route path="/Search" element={<SearchPage />} />
        <Route path="/CarsSaved" element={<CarsSavedPage />} />
        <Route path="/SignIn" element={<SignInPage />} />
        <Route path="/Register" element = {<RegisterPage/>} /> 
      </Routes>
      <Footer></Footer>
    </>
  );
}

export default App;
