import Navbar from "./components/navbar.jsx";
import IntroductionPage from "./pages/introductionPage";
import SearchPage from "./pages/searchPage.jsx";
import SignInPage from "./pages/signInPage.jsx";
import CarsSavedPage from "./pages/CarsSavedPage.jsx";
import RegisterPage from "./pages/registerPage.jsx";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/footer.jsx";
import ResultsPage from "./pages/resultsPage.jsx";
import ReviewPage from "./pages/reviewPage.jsx"

function App() {
  const carOptions = ["Toyota", "Honda", "Ford"]; //testing
  const carOptions1 = ["CRV", "XC90", "GT3"]; //testing
  const carOptions2 = ["2021", "2022", "2023"]; //testing

  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<IntroductionPage />} />
        <Route
          path="/Search"
          element={
            <SearchPage
              options={carOptions}
              model={carOptions1}
              year={carOptions2}
            />
          }
        />
        <Route path="/CarsSaved" element={<CarsSavedPage />} />
        <Route path="/SignIn" element={<SignInPage />} />
        <Route path="/Register" element={<RegisterPage />} />
        <Route path="/Result" element={<ResultsPage/>} />
        <Route
          path="/Review"
          element={
            <ReviewPage
              options={carOptions}
              model={carOptions1}
              year={carOptions2}
            />
          }
        />
      </Routes>
      <Footer></Footer>
    </>
  );
}

export default App;
