export const Profile = ({isAuthenticated}) => {
    console.log("Creaing Profile Component")
    return(
        isAuthenticated ? <UserProfile/> : <DefaultProfile/>
    )}
    
const UserProfile = ({userDisplayName}) => {
    console.log(`Creaing User-Profile of ${userDisplayName}`)
    return (
        <div>You are logged in as {userDisplayName}</div>
        )
    }
    
const DefaultProfile = () => {
    console.log("Creaing Default-Profile Component")
    return (
        <div>
            You are not logged in.<br/>
            Log in to participate.
        </div>
    )
}
