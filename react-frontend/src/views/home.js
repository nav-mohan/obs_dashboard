import React, { Fragment } from "react";
import ProcessIdButton from "../components/pid-button"
import StartObsButton from "../components/startObs-button";
import StopObsButton from "../components/stopObs-button";

const Home = () => {
    return (
        <div>
            <h1>THIS IS THE HOME PAGE</h1>
            <h3>We'll make API calls </h3>
            <ProcessIdButton/>
            <StartObsButton/>
            <StopObsButton/>
        </div>
    )
}

export {Home}