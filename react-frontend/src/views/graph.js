import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";

const graph = () => {
    const socket = socketIOClient(process.env.REACT_APP_SERVER_URL);

    return (
        <div className="m-2">
            GRAPH!!
        </div>
    )
}

export {graph};