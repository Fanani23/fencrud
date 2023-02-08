import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import Swal from "sweetalert2";
import Main from "../pages/Main";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Verification from "../pages/Auth/Verification";
import Profile from "../pages/Profile";

const Router = () => {
  const PrivateRoute = () => {
    const token = localStorage.getItem("token");
    if (token) {
      return <Outlet />;
    } else {
      Swal.fire("Warning", "Please login to your account first", "error");
      return <Navigate to="/login" />;
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<Login />} />
        <Route path="/main" element={<PrivateRoute />}>
          <Route index element={<Main />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verification" element={<Verification />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
