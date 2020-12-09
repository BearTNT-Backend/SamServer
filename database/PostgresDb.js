// 1. Make sure postgres dependency is installed. If not you can do this by using following command:


// npm install pg or npm install –g pg


// 2. Include the dependency into your code by:


// var pg = require(‘pg’);


// 3. Provide connection string for the postgreSQL client, port generally is default one i.e. 5432:


// var connectionString = "postgres://userName:password@serverName/ip:port/nameOfDatabase";


// 4. Instantiate the client for postgres database:


// var pgClient = new pg.Client(connectionString);


// 5. Connect to database by using following command:


// pgClient.connect();


// 6. Execute the query using following statement:


// var query = pgClient.query("SELECT id from Customer where name = 'customername'");


// 7. Get the result set using:


// query.on("row", function(row,result){

// result.addRow(row);

// });


// 8. You can delete row(s) by using the following piece of code:


// query.on("end", function(result){

// if(result.rows[0] === undefined){

// return;

// }

// else{

// var id = result.rows[0].id;

// var query = "delete from CustomerAddress where customer_id = " + id ;

// pgClient.query(query);

// }

// pgClient.end();

// });


// Steps 1, 2, 3, 4, 5 and 6 are pretty straight forward.
// Point 6 and 7 need a bit of explanation:

// The row event is dispatched whenever a row is received from db and we use it to append into an array of rows which is passed to a rows property in the end event’s result object. If we do not call the result.addRow() method, the rows array would be empty in the end event.

// The end event is dispatched when all rows have been returned by the query or when an error is encountered. Here we are first checking if the result is undefined or not. If not, delete the row in the table with same id and then close the client’s connection using the end() method on the pgClient object.

// You might need to open the port for outside connections for making calls to database through port 5432(being default port for postgreSQL) if you are connecting to the database remotely.


// var connectionString = "postgres://userName:password@serverName/ip:port/nameOfDatabase";

// var pgClient = new pg.Client(connectionString);

// const { Client } = require('pg')
// const client = new Client()
// await client.connect()
// const res = await client.query('SELECT $1::text as message', ['Hello world!'])
// console.log(res.rows[0].message) // Hello world!
// await client.end()

const pg = require('pg');
const client = new pg.Client({
  user: 'samgoldie',
  host: localhost,
  database: listdb,
  port: 5432
});
client.connect();


client.query('SELECTION STRING', (err, res) => {
  if (err) {
    console.log(err);
  }

});

// const { Pool, Client } = require('pg')
// const pool = new Pool({
//   user: 'dbuser',
//   host: 'database.server.com',
//   database: 'mydb',
//   password: 'secretpassword',
//   port: 3211,
// })
// pool.query('SELECT NOW()', (err, res) => {
//   console.log(err, res)
//   pool.end()
// })
// const client = new Client({
//   user: 'dbuser',
//   host: 'database.server.com',
//   database: 'mydb',
//   password: 'secretpassword',
//   port: 3211,
// })
// client.connect()
// client.query('SELECT NOW()', (err, res) => {
//   console.log(err, res)
//   client.end()
// })

const con = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'sammy',
  password: 'password',
  database: 'beartnt_reviews'
});
console.log('just about to connect!');

con.connect(err => {
  console.log('am i gonna connect or nooot?');
  err ? console.log(err) : console.log('Connected to the database!!');
});

const postDataToRatings = (params, id, callback) => {
  id = id || 5;
  var query = `INSERT INTO ratings VALUES (${params.average}, ${params.cleanliness}, ${params.communication}, ${params.checkin}, ${params.accuracy}, ${params.location}, ${params.value})`;
  con.query(query, (err, res) => {
    if (err) {
      callback(err);
    } else {
      con.end();
      callback(null, res);
    }
  });
};

const postDataToReviews = (params, id, callback) => {
  id = id || 5;
  var query = `INSERT INTO reviews VALUES (${params.name}, ${params.date}, ${params.reviewBody}, ${params.profilePic}, ${id})`;
  con.query(query, (err, res) => {
    err ? callback(err) : callback(null, res);
  });
};

const getAllDataFromTable = (table, id, callback) => {
  id = id || 5;
  var query = `SELECT * FROM ${table} WHERE ratings_id = ${id}`;
  con.query(query, (err, res) => {
    err ? callback(err) : callback(null, res);
  });
};
// the connection doesn't seem to close, which is odd

// update review function
const updateReview = (params, id, callback) => {
  id = id || 5;
  var updateSnippet = '';
  for (let key of params) {
    updateSnippet += `${key}: ${params[key]},`;
  }
  var query = `UPDATE [LOW_PRIORITY] [IGNORE] reviews
               SET
                  ${updateSnippet}
               WHERE ratings_id = ${id}`;
  con.query(query, (err, res) => {
    err ? callback(err) : callback(null, res);
  });
};

// update rating function
const updateRatings = (params, id, callback) => {
  id = id || 5;
  var updateSnippet = '';
  for (let key of params) {
    updateSnippet += `${key}: ${params[key]},`;
  }
  var query = `UPDATE [LOW_PRIORITY] [IGNORE] ratings
               SET
                  ${updateSnippet}
               WHERE ratings_id = ${id}`;
  con.query(query, (err, res) => {
    err ? callback(err) : callback(null, res);
  });
};

// delete review function
const deleteReview = (id, callback) => {
  id = id || 5;
  var query = `DELETE FROM reviews
               WHERE ratings_id = ${id}`; // does this handle foreign keys? probably not
  con.query(query, (err, res) => {
    err ? callback(err) : callback(null, res);
  });
};


module.exports = {
  postDataToRatings,
  postDataToReviews,
  getAllDataFromTable,
  updateReview,
  updateRatings,
  deleteReview,
  con
};