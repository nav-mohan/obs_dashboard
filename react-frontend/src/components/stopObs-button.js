import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const StopObsButton = () => {
    const [stdio, setStdio] = useState('');
    const serverUrl = "http://localhost:6060";
    const { getAccessTokenSilently } = useAuth0();

    const stopObs = async () => {
        try {
            const token = await getAccessTokenSilently();

            const response = await fetch(
                `${serverUrl}/stop`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            const responseData = await response.text();

            setStdio(responseData)
        }
        catch (error) {
            setStdio("ERROR")
        }
    }
    useEffect(() => {
        console.log(stdio)
    }, [stdio])
    return (
        <button onClick={stopObs}>Stop OBS</button>
    )
}

export default StopObsButton