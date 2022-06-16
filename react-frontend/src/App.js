import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Loading, LoginForm, NavBar} from "./components";
import {Route, Routes,useLocation } from "react-router-dom";
import {Home, Status, Watch} from "./views"
import { ProtectedRoute } from "./auth/protected-route";
import { Profile } from "./components/auth-header/profile";
import { AuthHeader } from "./components/auth-header/auth-header";

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