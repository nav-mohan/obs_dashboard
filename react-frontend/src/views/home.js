import React, { useState,useEffect } from "react";
import ProcessIdButton from "../components/pid-button"
import StartObsButton from "../components/startObs-button";
import StopObsButton from "../components/stopObs-button";
import ReadLogButton from "../components/readOut";
import InitObsWsButton from "../components/initObsWs-button";
import ObsLoginForm from "../components/loginObsWsForm";
import ObsStdLogs from "../components/obsLogs";

const Home = () => {
    const [stdOutLog, setStdOutLog] = useState('');

    useEffect(() => {
        console.log('stdOutLog')
        console.log({stdOutLog}["stdOutLog"])
        console.log(Object.keys({stdOutLog}))
    }, [stdOutLog])

    return (
        <div>
            <h1>THIS IS THE HOME PAGE</h1>
            <h3>We'll make API calls </h3>
            <ProcessIdButton/>
            <StartObsButton/>
            <StopObsButton/>
            <ReadLogButton setStdOutLog={setStdOutLog}/>
            <ObsLoginForm/>
            <ObsStdLogs stdOutLog={stdOutLog}/>
        </div>
    )
}

export {Home}