# A web-interface for controlling Open Broadcaster Studio

## NodeJS backend

## Wordpress Based Authentication

## React Frontend

## To Do

#### 1) Node.js needs to sanitize the login form before forwarding to Wordpress

#### 2) Ideally, React.js should have some component that protects Routes.
* Such a thing would likely use ```localStorage``` for good UX
* Make a ```<Profile/>``` component which shows whether you are logged out/in. It is one of the two/more routes on the header. ```<Auth/>``` is another one which displays ```Login``` or ```Logout``` depending on ```isAuthenticated```.
* checks whether ```localStorage.getItem('wordpressUsername')```, ```localStorage.getItem('wordpressJwt')```, and ```localStorage.getItem('wordpressJwtExp')``` exist.
* even if ```wordpressJwtExp``` has not passed, validate the ```wordpressJwt``` anyway with a ```GET``` request to [https://fm949.ca/wp-json/simple-jwt-login/v1/auth/validate&JWT=YOUR_JWT]
* if ```wordpressJwtExp``` has passed, alert the user that their session has ended and also do ```localStorage.removeItem('wordpressUsername')```, ```localStorage.removeItem('wordpressJwt')```, and ```localStorage.removeItem('wordpressJwtExp')```.
   * The purpose of storing the ```wordpressJwtExp``` is just for UI/UX to prompt the user that their session ends in X minutes.
   * Automatically refresh the token every time the window is refreshed or loaded by sending a ```POST``` request to ```https://fm949.ca/wp-json/simple-jwt-login/v1/auth``` with a form containing the ```usernameEmail``` & ```password```.
   * If ```wordpressJwt``` is invalid ```<Route path = "/auth" element = {<Auth/>}/>```
        ```<Auth/>``` returns two possible components ```<Login/>``` and ```<Logout/>```. Maintain a state ```isAuthenticated```.
   * Send ```POST``` request to Node.JS LoginRouter. Receive ```token```, ```tokenExpiry```, and ```username``` word and store them in ```locaStorage```. 
   * Route to ```<Route path = "/" element = {<ProtectedRoute component = {Home}/>}/>```
   * If ``token`` was already valid then Route to ```<Home/>```

### Someone on the internet recommends
Set the token expiration to 1 week BUT refresh it with every window load/reload. After a week of not loggin in, the use will have to login again. 
<i>Could the browser forget the token before the week is up? Yes, if the user clears their history/cookies/etc. The token's expiry is respected by the browser only in so far as it respects the localStorage. The token's expiry is respected by the NodeJS and Wordpress Servers though.</i>

### To validate a token before refreshing it
Send a ```GET``` request to ```https://fm949.ca/?rest_route=/simple-jwt-login/v1/auth/validate&JWT=YOUR_JWT```

### To refresh a token 
Send a ```POST``` request to ``` https://fm949.ca/?rest_route=/simple-jwt-login/v1/auth/refresh&JWT=YOUR_JWT```. 

### To revoke a token upon logging out
Send a ```POST``` request to ```https://fm949.ca/?rest_route=/simple-jwt-login/v1/auth/revoke&JWT=YOUR_JWT```

## IMPORTANT: JWT plugin settings
In the ```Login``` settings of the plugin, under the section <b>JWT Login Settings</b> choose```Action = Login by Wordpress Username``` and ```JWT Parameter key = username```. This is needed for correct parsing of the JWT when we later try to validate/refresh/revoke the token.

## How to go about validating and refreshing upon first load
   ### STEP 1 - Info from front-end
   - React collects localStorage ```token```, ```user_login```, ```user_pass``` and sends it to Node.JS ```validateRouter``` as a ```POST``` request
   
   ### STEP 2 - Validate,check,refresh
   - NodeJS forwards the ```token``` to JWT plugin ```/auth/validate``` URL as a ```GET``` request and awaits response. 
      - If token has expired (after 1 week) then NodeJS sends a ```revoke``` request to JWT plugin and returns a JSON to React ```{"success":false}```
      - If ```token``` is valid but ```token_username !== user_login``` then NodeJS sends a ```revoke``` request to JWT plugin and returns a ```JSON``` to React ```{"success":false}```
      - If ```token``` is valid and the token's username matches ```user_login``` then NodeJS refreshes the token by sending a ```POST``` request to ```/auth/validate``` with the ```user_login``` and ```user_pass``` 
         - If the refresh is unsuccessfull (because of incorrect localStorage user_login,user_pass) then it returns a ```JSON``` to React ```{"success":false}```
         - If the refresh is successfull, then NodeJS returns a ```JSON``` to React ```{"success":true, "JWT":new_token, "user_login":user_login, "user_pass":user_pass}```
   
   ### STEP 3 - update UI
   - If React receives a ```JSON``` of ```{"success":false}``` it removes the ```token```, ```user_login```, ```user_pass``` from ```localStorage```, calls ```setIsAuthenticated(false)``` and redirects to the ```LoginForm```.
   - If React receives a ```JSON``` of ```{"success":true, "JWT":new_token, "user_login":user_login, "user_pass":user_pass}``` it updates the ```localStorage```, calls ```setIsAuthenticated(true)``` and redirects to the ```Home```.