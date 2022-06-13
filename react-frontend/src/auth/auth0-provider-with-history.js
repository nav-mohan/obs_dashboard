import React from "react";
import { useNavigate } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

const Auth0ProviderWithHistory = ({children}) => {
    const navigate = useNavigate()
    const {authDomain, authClientId, authAudience} = require("../config");
    console.log(authDomain,authClientId,authAudience)
    const onRedirectCallback = (appState) => {
        navigate(appState?.returnTo || window.location.pathname);
      };

    return (
        <Auth0Provider
            domain = {authDomain}
            clientId = {authClientId}
            redirectUri={window.location.origin}
            onRedirectCallback={onRedirectCallback}
            audience={authAudience}
        >
            {children}
        </Auth0Provider>
    );
};

export {Auth0ProviderWithHistory};