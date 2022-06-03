import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const InitObsWsButton = ({obsIpAddress, obsWsPort, ObsWsPassword}) => {
    const [obsWsStatus, setObsWsStatus] = useState('');
    const serverUrl = process.env.REACT_APP_SERVER_URL;
    const { getAccessTokenSilently } = useAuth0();

    const initObsWs = async () => {
        try {
            const token = await getAccessTokenSilently();
            
            const response = await fetch(
                // `${serverUrl}/obsws/init-conn?${obsIpAddress}&${obsWsPort}&${ObsWsPassword}`,
                `${serverUrl}/obsws/init-conn`,
                {
                    headers:{
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            const responseData = await response.text();

            setObsWsStatus(responseData)
        }
        catch(error){
            setObsWsStatus("ERROR")
        }
    }
    useEffect(()=>{
        console.log("obsWsStatus")
        console.log(obsWsStatus)
    },[obsWsStatus])
    return (
        <button onClick={initObsWs}>Init OBS-WS</button>
    )
}

export default InitObsWsButton