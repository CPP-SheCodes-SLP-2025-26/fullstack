import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";

import Home from "./pages/Home";
import Calendar from "./pages/Calendar";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Chores from "./pages/Chores";
import Bills from "./pages/Bills";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        {/* Public routes */}
        <Route path="/home" element={<Home />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/chores" element={<Chores />} />
        <Route path="/bills" element={<Bills />} /> 

        {/* Login route */}
        <Route path="/login" element={<Login />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
