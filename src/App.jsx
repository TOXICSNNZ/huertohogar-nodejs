import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./components/pages/Home";
import Catalogo from "./components/pages/Catalogo";
import "./App.css"
import Checkout from "./components/pages/Checkout";
import Success from "./components/pages/Success";
import Fail from "./components/pages/Fail";


import Header from "./components/organisms/Header";
import Footer from "./components/organisms/Footer";
import Cart from "./components/pages/Cart";
import { AuthProvider } from "./context/AuthContext";
import Login from "./components/pages/Login";
import Registro from "./components/pages/Registro";
import Perfil from "./components/pages/Perfil";
import Blog from "./components/pages/Blog";

function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/success" element={<Success />} />
        <Route path="/fail" element={<Fail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/blog" element={<Blog />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
