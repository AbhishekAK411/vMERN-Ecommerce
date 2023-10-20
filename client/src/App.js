import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home/Home";
import Register from "./Components/User/Register";
import Login from "./Components/User/Login";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
