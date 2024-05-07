import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import NavBar from "./components/NavBar";
import Dashboard from "./pages/user/Dashboard";
import PrivateRoute from "./components/routes/PrivateRoute";
import Wishlist from "./pages/user/Wishlist";
import AdminRoute from "./components/routes/AdminRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminCategory from "./pages/admin/Category";
import AdminProduct from "./pages/admin/Product";
import UserProfile from "./pages/user/Profile";
import UserOrders from "./pages/user/Orders";

const PageNotFound = () => {
    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            404 | Page not found
        </div>
    )
}

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
                    <Route path="user" element={<Dashboard />}/>
                    <Route path="wishlist" element={<Wishlist />} />
                    <Route path="user/profile" element={<UserProfile />} />
                    <Route path="user/orders" element={<UserOrders />} />
                </Route>
                <Route path="/dashboard" element={<AdminRoute />}>
                    <Route path="admin" element={<AdminDashboard />}></Route>
                    <Route path="admin/category" element={<AdminCategory />}></Route>
                    <Route path="admin/product" element={<AdminProduct />}></Route>
                </Route>
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </BrowserRouter>
    );
}