import LoginForm from "../login-form"
import {Button} from 'react-bootstrap'
import { NavLink } from "react-router-dom"

export const AuthLink = ({
    isAuthenticated,
    setIsAuthenticated,
    setUserDisplayName
}) => {
    console.log("Creating Auth Link")
    if(!isAuthenticated){
        return (<LoginForm 
                    setIsAuthenticated = {setIsAuthenticated} 
                    setUserDisplayName = {setUserDisplayName}
                />)
    }
    return (<LogoutLink setIsAuthenticated={setIsAuthenticated}/>)
    }

const LogoutLink = ({setIsAuthenticated}) => {
    console.log("Creating Logout link")
    const revokeAndForgetToken = () => {
        localStorage.removeItem('radioWesternWordpressAccessToken')
        localStorage.removeItem('radioWesternWordpressUserLogin')
        localStorage.removeItem('radioWesternWordpressUserPass')
        return setIsAuthenticated(false)
    }
    
    return <Button onClick={revokeAndForgetToken}>Logout</Button>
}

