# A web-interface for controlling Open Broadcaster Studio

## NodeJS backend

## Wordpress Based Authentication

## React Frontend

## To Do

### 1) Node.js needs to sanitize the login form before forwarding to Wordpress

### 2) Ideally, React.js should have some component that protects Routes. Such a thing would likely use ```localStorage``` for good UX
#####   * checks whether ```localStorage.getItem('wordpressUsername')```, ```localStorage.getItem('wordpressJwt')```, and ```localStorage.getItem('wordpressJwtExp')``` exist.
#####   * even if ```wordpressJwtExp``` has not passed, validate the ```wordpressJwt``` anyway with a ```GET``` request to [https://fm949.ca/?rest_route=/simple-jwt-login/v1/auth/validate&JWT=YOUR_JWT]
#####   * if ```wordpressJwtExp``` has passed, alert the user that their session has ended and also do ```localStorage.removeItem('wordpressUsername')```, ```localStorage.removeItem('wordpressJwt')```, and ```localStorage.removeItem('wordpressJwtExp')```.
#####   * The purpose of storing the ```wordpressJwtExp``` is just for UI/UX to prompt the user that their session ends in X minutes.
#####   * If ```wordpressJwt``` is invalid ```<Route path = "/auth" element = {<Auth/>}/>```
######      - ```<Auth/>``` returns two possible components ```<Login/>``` and ```<Logout/>```
#####   * Send ```POST``` request to Node.JS LoginRouter. Receive ```wordpressJwt``` and ```wordpressJwtExp``` and store them in ```locaStorage```. 
#####   * Route to ```<Route path = "/" element = {<ProtectedRoute component = {Home}/>}/>```
#####   * If ``wordpressJwt`` was already valid then Route to ```<Home/>```