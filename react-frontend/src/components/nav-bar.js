import React from "react";

import { MainNav } from "./main-nav";
import { AuthHeader } from "./auth-header";

const NavBar = () => {
    return (
        <div>
            <AuthHeader/>
            <MainNav/>
        </div>
    )
};

export { NavBar };