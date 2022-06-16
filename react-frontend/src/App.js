import React, { useState } from "react";
import { Loading, LoginForm, NavBar} from "./components";
import {Route, Routes,useLocation } from "react-router-dom";
import {Home, } from "./views"
import { Profile } from "./components/profile";
import { AuthHeader } from "./components/auth-header";

function App() {
  const [isLoading, setIsLoading] = useState(false)
  if(isLoading){
    return <Loading/>
  }
  return (
    <div id = "app">
      <NavBar/>
      <div>
        <Routes>
          <Route element={<Profile/>} path = "/profile" />
          <Route element={<AuthHeader setIsLoading = {setIsLoading}/>} path = "/auth" />
        </Routes>
      </div>
    </div>

  )
}

export default App;