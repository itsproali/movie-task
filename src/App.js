import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import MovieDetails from "./pages/MovieDetails/MovieDetails";
import Loading from "./components/Loading/Loading";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/loading" element={<Loading />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
