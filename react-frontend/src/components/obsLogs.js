import React from "react";

const ObsStdLogs = ({stdOutLog}) => {
    const items = []
    for (let i = 0; i < stdOutLog.length; i++) {
        const line = stdOutLog[i];
        items.push(<span key={i}>{line}<br/></span>)
    }
    return (
        <div id = "obs-logs">
            <p>OBS stdout logs</p>
            {items}
        </div>
    )
}

export default ObsStdLogs