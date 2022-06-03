import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const ReadLogButton = () => {
    const [outlog, setOutLog] = useState('');
    const serverUrl = "http://localhost:6060";
    const { getAccessTokenSilently } = useAuth0();

    const readOutLog = async () => {
        try {
            const token = await getAccessTokenSilently();

            const response = await fetch(
                `${serverUrl}/read`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            const responseData = await response.text();

            setOutLog(responseData)
        }
        catch (error) {
            setOutLog("ERROR")
        }
    }
    useEffect(() => {
        console.log(outlog)
    }, [outlog])
    return (
        <button onClick={readOutLog}>Read out.log</button>
    )
}

export default ReadLogButton