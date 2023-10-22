import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home/Home";
import Register from "./Components/User/Register";
import Login from "./Components/User/Login";
import Multiple from "./Components/Multiple-Products/Multiple";
import Navbar from "./Components/Global/Navbar";
import Navigation from "./Components/Global/Navigation";
import Add from "./Components/Product/Add";
import Edit from "./Components/Product/Edit";
import Get from "./Components/Product/Get";

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
        <Route exact path="/addProducts" element={<Add />} />
        <Route exact path="/editProducts" element={<Edit />} />
        <Route exact path="/sellerProducts" element={<Get />} />
      </Routes>
    </>
  );
}

export default App;
