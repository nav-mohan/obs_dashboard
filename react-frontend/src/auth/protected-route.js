import React from "react";
import { Route } from "react-router-dom";

import { withAuthenticationRequired } from "@auth0/auth0-react";
import { Loading } from "../components";

const ProtectedRoute = ({component}) => {
    const Component = withAuthenticationRequired(
        component, {onRedirecting:() => <Loading/>}
        )
    return Component();
};

export {ProtectedRoute};