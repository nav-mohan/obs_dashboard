import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
const nodeBaseUrl = require("../config")

const graph = () => {
    const socket = socketIOClient(nodeBaseUrl);

    return (
        <div className="m-2">
            GRAPH!!
        </div>
    )
}

export {graph};