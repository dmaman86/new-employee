//=======================
// PORT
//=======================

process.env.PORT = process.env.PORT || 3000;

//=======================
// Entorno
//=======================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


//=======================
// SEED authenticated
//=======================

process.env.SEED = process.env.SEED || 'secret';

//=======================
// DB
//=======================

let urlDB;

if ( process.env.NODE_ENV === 'dev' ) {
    urlDB = 'mongodb://localhost:27017/employee_management';
} else {
   urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;
