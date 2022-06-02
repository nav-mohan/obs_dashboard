import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const ProcessIdButton = () => {
    const [pid, setPid] = useState('');
    const serverUrl = "http://localhost:6060";
    const { getAccessTokenSilently } = useAuth0();

    const getPid = async () => {
        try {
            const token = await getAccessTokenSilently();
            
            const response = await fetch(
                `${serverUrl}/pid`,
                {
                    headers:{
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            const responseData = await response.text();

            setPid(responseData)
        }
        catch(error){
            setPid("ERROR")
        }
    }
    useEffect(()=>{
        console.log(pid)
    },[pid])
    return (
        <button onClick={getPid}>Get PID</button>
    )
}

export default ProcessIdButton