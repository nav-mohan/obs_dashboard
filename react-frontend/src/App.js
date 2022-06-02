import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { NavBar, Loading} from "./components";
import {Route, Routes } from "react-router-dom";
import {Home, Status, Watch} from "./views"
import { ProtectedRoute } from "./auth/protected-route";

function App() {
  // const NODE_SERVER = process.env.REACT_APP_SERVER_URL;
  const {isLoading} = useAuth0();
  if(isLoading){
    return <Loading/>
  }
  return (
    <div id = "app">
      <NavBar/>
      <div>
      <Routes>
        <Route path = "/" exact element={<ProtectedRoute component = {Home}/>}/>
        <Route path = "/status" element={<ProtectedRoute component ={Status}/>}/>
        <Route element={<Watch/>} path = "/watch" />
      </Routes>
      </div>
    </div>

  )
}

export default App;