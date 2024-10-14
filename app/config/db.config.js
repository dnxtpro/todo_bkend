module.exports = {
  HOST: "localhost",
  USER: "dnxtpro",
  PASSWORD: "locoplaya",
  DB: "todo",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
