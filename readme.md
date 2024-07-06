# Technical Test Project - User login with JWT
## Backend
The backend is complete with integration with docker.
Just only need to use ```docker compose up``` to create to container to expose port 8080 in localhost.

## Frontend
The frontend is almost complete, but the notification and protected route still have problem need to be fixed because some change in app router.

## Todo
 - The implementation on redirect and notification is not ideal, will be rewrite in next week.
 - Just use simple JWT is not secure, it will add session to the database schema and add session to token data for use authentication.
 - Integrate into docker compose.

## Install
1. Clone the repository using ```git clone```
2. Use ```docker compose up``` to create to container to expose port 8080 in localhost.
3. Go into the frontend folder, use ```npm run dev``` to run the application locally.