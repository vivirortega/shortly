<div align="center">
<h1>Shortly. 🩳</h1>
</div>

<h2>About the project:</h2>
<p>Backend application of an app to shorten urls.</p>
<h2>Features</h2>
<p> ✅ <b>/signup</b> - POST to register a user.
<p> ✅ <b>/signin</b> - POST to log in with an already registered user.</p>
<p> ✅ <b>/urls/shorten</b> - POST to shorten a url using the <a href="https://www.npmjs.com/package/nanoid">nanoid</a> package.</p>
<p> ✅ <b>/ranking</b> - GET to get all shortened urls most visited by user.</p>

<h2>Technologies:</h2>
<div align="center">
<img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white"/>
<img src="https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white"/>
<img src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E"/>
  
</div>

<h2>How to run:</h2>
<h3>Clone the repository:</h3>

```
$ git clone https://github.com/unverzed/shortly.git
```

<h3>Install the dependencies:</h3>

```
$ npm i
```
<h3>Create database:</h3>

```
$ cd database

bash ./create-database 
```

<h3>Preparing Setup:</h3>

<p>In the main API folder, create a .env and insert PORT and DATABASE_URL.</p>

<h3>Initializing the API:</h3>

```
$ node index.js
```

