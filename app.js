
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const secret = 'full'
const saltRounds = 10;

app.use(cors());
app.use(jsonParser);

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'box_safety',
});

connection.connect((err) => {
  if (err) {
    console.log('Error connecting to MySQL:', err);
    process.exit(1); // Exit the process if there's an error connecting to the database
  } else {
    console.log('Connected to MySQL');
  }
});
//////////////////////////////////////////////////////////register/////////////////////////////////////////////////////////
// app.post('/register', async (req, res) => {
//   const { Email, Username, Password } = req.body;

//   try {
//     // Hash the password before saving it to the database
//     const hashedPassword = await bcrypt.hash(Password, 10);

//     const insertUserQuery = 'INSERT INTO info (Email, Username, Password) VALUES (?, ?, ?)';
//     const values = [Email, Username, hashedPassword];

//     connection.query(insertUserQuery, values, (err, result) => {
//       if (err) {
//         console.log('Error registering user:', err);
//         res.status(500).send('Error registering user.');
//       } else {
//         console.log('User registered successfully.');
//         res.status(201).send('User registered successfully.');
//       }
//     });
//   } catch (error) {
//     console.error('Error hashing password:', error);
//     res.status(500).send('Error registering user.');
//   }
// });

// app.post('/register', jsonParser, function(req, res, next) {

//   // Hash the password before storing it
//   bcrypt.hash(req.body.Password, saltRounds, function(err, hash) {
//     if (err) {
//       console.error('Error hashing password:', err);
//       return res.status(500).json({ status: 'error', message: 'Error hashing password' });
//     }

//     // Perform the database insertion with the hashed password
//     connection.execute(
//       'INSERT INTO info (Email, Username, Password) VALUES (?, ?, ?)',
//       [req.body.Email, req.body.Username, hash],
//       function(err, result,fields) {
//         if (err) {
//           console.error('Error inserting user:', err);
//           return res.status(500).json({ status: 'error', message: 'Error inserting user' });
//         }

//         console.log('User registered successfully.');
//         return res.status(201).json({ status: 'ok', message: 'User registered successfully' });
//       }
//     );
//   });
// });

app.post('/register', jsonParser, function(req, res, next) {
  // Hash the password before storing it
  bcrypt.hash(req.body.Password, saltRounds, function(err, hash) {
    if (err) {
      console.error('Error hashing password:', err);
      return res.status(500).json({ status: 'error', message: 'Error hashing password' });
    }

    // Perform the database insertion with the hashed password
    connection.execute(
      'INSERT INTO info (Email, Username, Password) VALUES (?, ?, ?)',
      [req.body.Email, req.body.Username, hash],
      function(err, result) {
        if (err) {
          console.error('Error inserting user:', err);
          return res.status(500).json({ status: 'error', message: 'Error inserting user' });
        }

        console.log('User registered successfully.');
        return res.status(201).json({ status: 'ok', message: 'User registered successfully' });
      }
    );
  });
});


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////login//////////////////

// app.post('/login', jsonParser, function (req, res, next) { 
//   connection.execute(
//     'SELECT * FROM info WHERE Username=?',
//     [req.body.Username],
//     function(err, info, fields) {
//       if (err) { 
//         console.error('Error executing SQL query:', err);
//         res.json({status: 'error', message: 'An error occurred during login'});
//         return next(); // Call next middleware
//       }

//       if (info.length === 0) { 
//         console.log('No user found with the provided username:', req.body.Username);
//         res.json({status: 'error', message: 'No user found'}); 
//         return next(); // Call next middleware
//       } 
      
//       bcrypt.compare(req.body.Password, info[0].Password, function(err, isLogin) {
//         if (err) {
//           console.error('Error comparing passwords:', err);
//           res.json({status: 'error', message: 'An error occurred during login'});
//           return next(); // Call next middleware
//         }

//         console.log('Input Username:', req.body.Username);
//         console.log('Input Password:', req.body.Password);

//         if (isLogin) {
//           var token = jwt.sign({ Username: info[0].Username }, secret,{ expiresIn: '1h' });
//           console.log('Login successful for user:', req.body.Username);
//           res.json({status: 'ok', message: 'Login successful',token});
//         } else {
//           console.log('Login failed for user:', req.body.Username);
//           res.json({status: 'error', message: 'Login failed'});
//         }
//         return next(); // Call next middleware
//       });
//     }
//   );
// });

// app.post('/login', jsonParser, function (req, res, next) { 
//   connection.execute(
//     'SELECT * FROM info WHERE Username=?',
//     [req.body.Username],
//     function(err, info, fields) {
//       if (err) { 
//         console.error('Error executing SQL query:', err);
//         return res.status(500).json({ status: 'error', message: 'An error occurred during login' });
//       }

//       if (info.length === 0) { 
//         console.log('No user found with the provided username:', req.body.Username);
//         return res.status(404).json({ status: 'error', message: 'No user found' });
//       } 
      
//       const storedPassword = Buffer.from(info[0].Password, 'base64').toString('utf-8');

//       bcrypt.compare(req.body.Password, storedPassword, function(err, isLogin) {
//         if (err) {
//           console.error('Error comparing passwords:', err);
//           return res.status(500).json({ status: 'error', message: 'An error occurred during login' });
//         }

//         console.log('Input Username:', req.body.Username);
//         console.log('Input Password:', req.body.Password);
//         console.log('Stored Password (Decoded):', storedPassword);
//         console.log('Password comparison result:', isLogin);

//         if (isLogin) {
//           var token = jwt.sign({ Username: info[0].Username }, secret, { expiresIn: '1h' });
//           console.log('Login successful for user:', req.body.Username);
//           return res.json({ status: 'ok', message: 'Login successful', token });
//         } else {
//           console.log('Login failed for user:', req.body.Username);
//           return res.status(401).json({ status: 'error', message: 'Login failed' });
//         }
//       });
//     }
//   );
// });

      app.post('/login', jsonParser, function (req, res, next) { 
        connection.execute(
          'SELECT * FROM info WHERE Username=?',
          [req.body.Username],
          function(err, info, fields) {
            if (err) { res.json({status: 'error', message: err});return }
            if (info.length == 0) { res.json({status: 'error', message: 'no user found' }); return } 
            bcrypt.compare(req.body.Password, info[0].Password, function(err, isLogin) {

              console.log('Input Username:', req.body.Username);
              console.log('Input Password:', req.body.Password);
              console.log('Stored Password:', info[0].Password);
  
             if (err) {
              console.error('Error comparing passwords:', err);
              res.json({ status: 'error', message: 'An error occurred during login' });
              return next(); // Call next middleware
            }

            
              if (isLogin) {
                var token = jwt.sign({ Username: info[0].Username }, secret, { expiresIn: '1h' });
                res.json({ status: 'ok', message: 'login success',token });
                
              } else {
                res.json({ status: 'error', message: 'login failed' });
              }
              return next(); // Call next middleware
            });

                }
            );
        });


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////authen///////////////////////////////////
app.post('/authen', jsonParser, function (req, res, next) { 
  try {
    const token = req.headers.authorization.split(' ')[1]
  var decoded = jwt.verify(token, secret);
  res.json({status: 'ok',decoded})
  
  } catch(err){
  res.json({status: 'error',message:err.message})
  }
  
});



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////z

app.listen(3001, function () {
  console.log('CORS-enabled web server listening on port 3001');
});

// Handle process termination to close the database connection
process.on('SIGINT', () => {
  connection.end();
  process.exit();
});
