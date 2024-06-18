# Objective
Create a web application that has the following features:
<br/>1. Login
<br/>2. Upload content/post
<br/>3. Choose which users can access this post
<br/>4.  Sql database with passwords stored
<br/>5. All members are in offline network only
<br/>The backend will use Node.js and mySQL for the database. The frontend will use HTML, CSS, and JavaScript. 
Since this is an offline network application, we can assume the environment will allow hosting the server locally.


# Structure

offline-forum/                                               <br/>
│                                                            <br/>
|── public/                                                  <br/>
│   ├── index.html                                           <br/>
│   ├── login.html                                           <br/>
│   ├── register.html                                        <br/>
│   ├── dashboard.html                                       <br/>
│   ├── styles.css                                           <br/>
│   ├── dashboard.js                                         <br/>
│   └── app.js                                               <br/>
│                                                            <br/>
├── server/                                                  <br/>
│   ├── server.js                                            <br/>
│   └── db.js                                                <br/>
│                                                            <br/>
├── node_modules/                                            <br/>
├── package.json                                             <br/>
└── README.md
