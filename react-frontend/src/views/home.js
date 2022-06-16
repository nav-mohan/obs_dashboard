import React, { useState,useEffect } from "react";

const Home = ({isAuthenticated}) => {
    if(isAuthenticated){

        return (
            <div>
                <h1>Make the UI and Routes work proper first</h1>
            </div>
        )
    }
    return (
        <div>
            Please Login
        </div>
    )
}

export {Home}