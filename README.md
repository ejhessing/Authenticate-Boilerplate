<h1>Authentication</h1>

<p>I created this for future reference when I need to work with authentication and or hashing.  No time has been spent on UX or design. </p>

<h2>Tech Stack</h2>
<ul>
   <li>PassportJS - Authentication</li>
   <li>Bcrypt - Hashing</li>
   <li>Sqlite3/Postgresql - Database</li>
   <li>Knexjs - SQL Query builder</li>
   <li>Express - Server</li>
</ul>

<h2>How to install</h2>
```
npm install
npm run knex migrate:latest
```

<h2>How to use</h2>
```
npm start
go to -> http://localhost:3000
```

<h2>Routes</h2>

```
GET: '/' --> Login
POST: '/login' --> on success goes to secret page

GET: '/signup' --> Sign up form
Post: '/signup' --> on success goes to '/' to login

JSON: '/users' --> API to get all the users in the database and confirm passwords are being hashed

```