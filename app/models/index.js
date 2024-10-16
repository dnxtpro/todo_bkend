const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.category = require("../models/category.model.js")(sequelize,Sequelize);
db.event = require("../models/event.model.js")(sequelize,Sequelize);
db.role.belongsToMany(db.user, {
  through: "user_roles"
});
db.user.belongsToMany(db.role, {
  through: "user_roles"
});
db.event.belongsTo(db.category, {
  foreignKey: "category_id",
  as: "Categoria", // Alias para la categoría en los eventos
});
db.category.hasMany(db.event, {
  foreignKey: "category_id",
  as: "eventos", // Alias para los eventos en la categoría
});

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
