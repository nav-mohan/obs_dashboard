import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const ProcessIdButton = () => {
    const [pid, setPid] = useState('');
    const serverUrl = process.env.REACT_APP_SERVER_URL;
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
            )
            .then((res)=>{
                console.log(res);
                return res.json()
            })
            .then((res_json)=>{
                if(res_json['stdout'].length>2){
                    console.log(res_json);
                    return +res_json['stdout']
                }
                else{
                    console.log("stdout less than 3")
                    return 0
                }
            })
            setPid(response)
        }
        catch(error){
            setPid("ERROR")
        }
    }
    useEffect(()=>{
        console.log(`pidupdates - ${pid}`)
    },[pid])
    return (
        <button onClick={getPid}>Get PID</button>
    )
}

export default ProcessIdButton