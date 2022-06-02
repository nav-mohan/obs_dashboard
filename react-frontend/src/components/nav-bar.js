import React from "react";

import { MainNav } from "./main-nav";
import { AuthNav } from "./auth-nav";

const NavBar = () => {
    return (
        <div>
            <MainNav/>
            <AuthNav/>
        </div>
    )
};

export { NavBar };