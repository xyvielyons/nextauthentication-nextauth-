//an array of routes that are accessible to the public
//these routes do not require authentication
export const PublicRoutes = [
    "/","/auth/new-verification"
]
//an array of routes that are used for authentication
//these routes will redirect logged in users to /settings
export const AuthRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/error",
    "/auth/reset",
    "/auth/new-password"
]
//The prefix for api authentication routes
//Routes that start with this prefix are used for api authentication purposes
export const ApiAuthPrefix = "/api/auth"
//The default redirect path after logging in
export const DEFAULT_LOGIN_REDIRECT = "/settings"

