module.exports = {
  HOST: 'localhost',
  PORT: '5432',
  USER: 'postgres',
  PASSWORD: 'alex6395',
  DB: 'OmeGame',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

// Config AWS

// module.exports = {
//     HOST: "localhost",
//     PORT: "5432",
//     USER: "stephane",
//     PASSWORD: "stephane",
//     DB: "omegame",
//     dialect: "postgres",
//     pool: {
//         max: 5,
//         min: 0,
//         acquire: 30000,
//         idle: 10000,
//     },
// };
