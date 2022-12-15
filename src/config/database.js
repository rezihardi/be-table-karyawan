const Sequelize = require("sequelize");

const db = new Sequelize('sarana', process.env.DB_USER, '', {
	dialect: 'mysql',
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	// logging : false,
	//logging : console.log,
	pool: {
	    max: 5,
	    min: 2,
	    idle: 20000,
	    acquire: 200000
  	}

});

db.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
module.exports = db;
