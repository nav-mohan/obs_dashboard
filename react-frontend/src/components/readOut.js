import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const ReadLogButton = ({setStdOutLog}) => {
    const serverUrl = process.env.REACT_APP_SERVER_URL;
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
            setStdOutLog(responseData.split("\n"))
        }
        catch (error) {
            console.log(error)
            setStdOutLog("ERROR")
        }
    }

    return (
        <button onClick={readOutLog}>Read out.log</button>
    )
}

export default ReadLogButton