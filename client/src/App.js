import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home/Home";
import Register from "./Components/User/Register";
import Login from "./Components/User/Login";
import Multiple from "./Components/Multiple-Products/Multiple";
import Navbar from "./Components/Global/Navbar";
import Navigation from "./Components/Global/Navigation";

function App() {
  return (
    <>
      <Navbar />
      <Navigation />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/products" element={<Multiple />} />
      </Routes>
    </>
  );
}

export default App;
