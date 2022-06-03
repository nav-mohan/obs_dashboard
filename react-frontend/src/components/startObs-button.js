import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const StartObsButton = () => {
    const [obsLogs, setObsLogs] = useState('');
    const serverUrl = process.env.REACT_APP_SERVER_URL;
    const { getAccessTokenSilently } = useAuth0();

    const startObs = async () => {
        try {
            const token = await getAccessTokenSilently();

            const response = await fetch(
                `${serverUrl}/start`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            const responseData = await response.text();

            setObsLogs(responseData)
        }
        catch (error) {
            setObsLogs("ERROR")
        }
    }
    useEffect(() => {
        console.log("obsLogs")
        console.log(obsLogs)
    }, [obsLogs])
    return (
        <button onClick={startObs}>Start OBS</button>
    )
}

export default StartObsButton