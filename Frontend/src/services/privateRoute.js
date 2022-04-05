import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    console.log("child", children);
    const auth = sessionStorage.getItem("userAuthData");
    const istaff = sessionStorage.getItem("isstaff")
    return auth && istaff === true || false ? children : <Navigate to="/forbidden" />;

};

export default PrivateRoute;
