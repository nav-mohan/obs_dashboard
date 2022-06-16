import React, { useState,useEffect } from "react";
import ProcessIdButton from "../components/pid-button"
import StartObsButton from "../components/startObs-button";
import StopObsButton from "../components/stopObs-button";
import ReadLogButton from "../components/readOut";
import InitObsWsButton from "../components/initObsWs-button";
import ObsLoginForm from "../components/loginObsWsForm";
import ObsStdLogs from "../components/obsLogs";

const Home = ({isAuthenticated}) => {
    const [stdOutLog, setStdOutLog] = useState('');
    if(isAuthenticated){

        return (
            <div>
                <h1>Make the UI and Routes work proper first</h1>
                {/* <ProcessIdButton/> */}
                {/* <StartObsButton/> */}
                {/* <StopObsButton/> */}
                {/* <ReadLogButton setStdOutLog={setStdOutLog}/> */}
                {/* <ObsLoginForm/> */}
                {/* <ObsStdLogs stdOutLog={stdOutLog}/> */}
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