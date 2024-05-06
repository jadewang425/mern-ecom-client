import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import NavBar from "./components/NavBar";
import Dashboard from "./pages/user/Dashboard";
import PrivateRoute from "./components/routes/PrivateRoute";
import Wishlist from "./pages/user/Wishlist";

export default function App() {
    return (
        <BrowserRouter>
            <NavBar />
            <Toaster />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<PrivateRoute />}>
                    <Route path="" element={<Dashboard />}/>
                    <Route path="wishlist" element={<Wishlist />}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}