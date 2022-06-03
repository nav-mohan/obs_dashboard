import React, { useState } from "react";
import InitObsWsButton from "./initObsWs-button";

const ObsLoginForm = () => {
    const [obsIpAddress,setObsIpAddress] = useState('')
    const [obsWsPort,setObsWsPort] = useState('')
    const [ObsWsPassword,setObsWsPassword] = useState('')

    return (
        <div>
            <input defaultValue='localhost' type='text' />
            <input defaultValue = '4444' type='text'/>
            <input defaultValue = '1234' type='password'/>
            <InitObsWsButton obsIpAddress={obsIpAddress} obsWsPort={obsWsPort} ObsWsPassword={ObsWsPassword}/>
        </div>
    )
}
export default ObsLoginForm