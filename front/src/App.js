import React from "react";
import Home from './pages/Home'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import 'bootstrap/dist/css/bootstrap.min.css'
import Carousel from "./admin/Carousel";
import AdminPanel from "./admin/adminpanel";
import About from "./pages/About";
import Aboutus_edit from "./admin/Aboutus";
import AboutUsTeamMember from "./admin/AboutUsTeamMember";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="carousel" element={<Carousel />} />
        <Route path="adminpanel" element={<AdminPanel />} />
        <Route path="aboutus" element={<About />} />
        <Route path="aboutus_edit" element={<Aboutus_edit />} />
        <Route path="AboutUsTeamMember" element={<AboutUsTeamMember />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App;