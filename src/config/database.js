const Sequelize = require("sequelize");

const db = new Sequelize('sarana', 'root', '', {
	dialect: 'mysql',
	host: 'localhost',
	port: 3306,
	// logging : false,
	//logging : console.log,
	pool: {
	    max: 5,
	    min: 2,
	    idle: 20000,
	    acquire: 200000
  	}

});


//async tabel db

// (async()=>{
//     await db.sync();
// })();

db.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
module.exports = db;
