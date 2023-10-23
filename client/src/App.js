import { Route, Routes } from "react-router-dom";
// import Home from "./Components/Home/Home";
import Register from "./Components/User/Register";
import Login from "./Components/User/Login";
import Multiple from "./Components/Multiple-Products/Multiple";
import Navbar from "./Components/Global/Navbar";
import Navigation from "./Components/Global/Navigation";
import Add from "./Components/Product/Add";
import Edit from "./Components/Product/Edit";
import Get from "./Components/Product/Get";
import Single from "./Components/Single/Single";
import Cart from "./Components/Cart/Cart";
import Mens from "./Components/Category/Mens";
import Womens from "./Components/Category/Womens";
import Electronics from "./Components/Category/Electronics";

function App() {
  return (
    <>
      <Navbar />
      <Navigation />
      <Routes>
        {/* <Route exact path="/" element={<Home />} /> */}
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/" element={<Multiple />} />
        <Route exact path="/addProducts" element={<Add />} />
        <Route exact path="/editProducts" element={<Edit />} />
        <Route exact path="/sellerProducts" element={<Get />} />
        <Route exact path="/single/:id" element={<Single />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/mens" element={<Mens />} />
        <Route exact path="/womens" element={<Womens />} />
        <Route exact path="/electronics" element={<Electronics />} />
      </Routes>
    </>
  );
}

export default App;
