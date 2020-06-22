module.exports = {
  HOST: 'ec2-34-205-156-142.compute-1.amazonaws.com',
  PORT: '5432',
  USER: 'alexandre',
  PASSWORD: 'alexandre',
  DB: 'omegame',
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
