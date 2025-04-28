# Creator's Dashboard

A Web app theat allows users (creators) to manage their profile, earn credits and interact through a personalized feed.

## Live link: http://13.200.177.84/

## Features

- User registration and login
- User profile management
- Credit management
- Personalized feed
- Saved posts
- Admin dashboard

<img src="./screenshot/Screenshot%202025-04-28%20at%2022-29-50%20Creator%20Dashboard.png" alt="Feed" width="200" />
<img src="./screenshot/Screenshot%202025-04-28%20at%2022-28-22%20Creator%20Dashboard.png" alt="Signin" width="200" />
<img src="./screenshot/Screenshot%202025-04-28%20at%2022-29-16%20Creator%20Dashboard.png" alt="Signup" width="200" />
<img src="./screenshot/Screenshot%202025-04-28%20at%2022-34-34%20Creator%20Dashboard.png" alt="Admin" width="200" />
<img src="./screenshot/Screenshot%202025-04-28%20at%2022-35-02%20Creator%20Dashboard.png" alt="UserActivity" width="200" />

## Instructions to run locally

1. Clone the repository
2. Install dependencies in ./app & ./server using `npm install`
3. Create a .env file in ./server with the following content:

```
DATABASE_URL="<mongodb-url>"
PORT=3456
SESSION_SECRET=<session-secret>
```

4. Push prisma schema using `npm run db:push` in ./server
5. Generate prisma types using `npm run db:generate` in ./server
6. Run the server using `npm run dev` in ./server
7. Create a .env file in ./app with the following content:

```
SERVER_URL=http://localhost:3456
```

8. Run the app using `npm run dev` in ./app
9. Open http://localhost:5173 in your browser

## Deployment steps

1. Create a new MongoDB database and a new user with read and write permissions.
2. Create a new MongoDB Atlas cluster and connect it to the database.
3. Create a new MongoDB Atlas API key and add it to the .env file in ./server.
4. Deploy the server to a GCP server of your choice.
5. Deploy the app to the GCP server of your choice using nginx or any other web server.
