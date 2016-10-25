<h1>Authentication</h1>

<p>I created this for future reference when I need to work with authentication and or hashing.  No time has been spent on UX or design. </p>

<h2>Tech Stack</h2>
<ul>
   <li>Express - Server</li>
   <li>PassportJS - Authentication</li>
   <li>Bcrypt - Hashing</li>
   <li>Sqlite3/Postgresql - Database</li>
   <li>Knexjs - SQL Query builder</li>
   <li>Nodemailer - Sends Emails</li>
   <li>SendGrid - Emailing service</li>
   <li>dotenv - Use .env files to save protected data (API keys)</li>
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
Get: '/logout' --> Logs the user out and deletes session data

GET: '/signup' --> Sign up form
POST: '/signup' --> on success goes to '/' to login

GET: '/forgot' --> Forgot your password form
POST: '/forgot' --> Creates a crypto random code that will be used as a token.  The token is saved into the reset table with an hour time limit. This token is then 
sent to the user's email address with infromation on how they can change their password

GET: '/resetPassword/:token' --> The reset password page that asks for their email and new password 
POST: '/resetPassword' --> The token is checked against our database to confirm it is still valid and then looks to update their records with their new password if their email also matches 


JSON: '/users' --> API to get all the users in the database and confirm passwords are being hashed
JSON: '/reset' --> API to get all the data in the reset database table.  This will give you an ability to see the tokens and when they expire
```

<h2>How to send emails with SendGrid</h2>

<p>To send emails you need to create a SendGrid account and use their API.  You will need to create a .env file to save the API key under SGApi</p>



<h2>To add in the future</h2>

I will be looking to add OAuth for Facebook, Twitter and Google in the near future