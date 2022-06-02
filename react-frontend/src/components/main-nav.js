import { NavLink } from "react-router-dom";
import React from "react";

const MainNav = () => {
    return(
    <div >
        <NavLink to="/">Home</NavLink>
        <NavLink to="/status">Status</NavLink>
        <NavLink to="/watch">Watch</NavLink>
    </div>
    )
};
export {MainNav}