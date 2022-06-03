import React from "react";

const ObsStdLogs = ({stdOutLog}) => {
    return (
        <div>
            <p>OBS stdout logs</p>
            {stdOutLog}
        </div>
    )
}

export default ObsStdLogs