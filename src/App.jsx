import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./components/pages/Home";
import Catalogo from "./components/pages/Catalogo";
import "./App.css"
import Checkout from "./components/pages/Checkout";
import Success from "./components/pages/Success";
import Fail from "./components/pages/Fail";

// Organisms
import Header from "./components/organisms/Header";
import Footer from "./components/organisms/Footer";
import Cart from "./components/pages/Cart";

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/success" element={<Success />} />
        <Route path="/fail" element={<Fail />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
